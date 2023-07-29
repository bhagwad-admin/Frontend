import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, FRONT_URL } from "./Constant.js";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { MdArrowBack } from "react-icons/md";
import { Helmet } from "react-helmet";
import userIcon from "./Assets/user-icon.png";
import replyIcon from "./Assets/reply.png";

const BlogPage = () => {
  const { blogId } = useParams();

  const navigate = useNavigate();

  const [blogData, setBlogData] = useState([]);
  const [fetchedComments, setFetchedComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [emptyField, setEmptyField] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [postDate, setPostDate] = useState("");
  const [postTime, setPostTime] = useState("");
  const [paragraphs, setParagraphs] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const commentBoxRef = useRef(null);

  const handleBack = () => {
    navigate(`/blogs`);
  };

  // Convert the date and time to IST
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const timeOptions = {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const handleReply = (comment) => {
    // console.
    setReplyTo(comment);
    setIsActive(true);
    commentBoxRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const postComment = async () => {
    setIsValidEmail(true);
    setEmptyField(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length == 0 || email.length == 0 || comment.length == 0) {
      setEmptyField(true);
      return;
    }

    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      setIsValidEmail(false);
      return;
    }

    // console.log("replyTo", replyTo.id.toString());

    setIsCommentLoading(true);
    let parentId = null;

    if (replyTo) {
      parentId = replyTo.id.toString();
    }

    // const

    const obj = {
      data: {
        Email: email,
        Name: name,
        Comment: comment,
        blog: blogData,
        parentId: parentId,
      },
    };

    // console.log("obj", obj);

    await axios
      .post(`${BASE_URL}/api/comments`, obj)
      .then((res) => {
        setName("");
        setEmail("");
        setComment("");
        setReplyTo(null);
        setIsActive(false);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsCommentLoading(false);
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setComment("");
    setReplyTo(null);
    setIsActive(false);
  };

  const renderNestedReplies = (parentId) => {
    if (parentId == null) return;

    const nestedReplies = fetchedComments.filter((cmnt) => {
      //   console.log(parentId, cmnt.attributes.parentId);
      return parseInt(cmnt.attributes.parentId) === parseInt(parentId);
    });

    // console.log("parentId", parentId, nestedReplies);

    if (nestedReplies.length === 0) {
      return null;
    }

    return (
      <div className="flex flex-col w-full ml-6">
        {nestedReplies?.map((reply) => {
          const dateTime = new Date(reply?.attributes?.createdAt);

          const dateIST = dateTime.toLocaleDateString("en-IN", options);
          const timeIST = dateTime.toLocaleTimeString("en-IN", timeOptions);

          return (
            <div className="flex flex-col  border-b-slate-700 space-y-5 w-full  px-5 py-4 rounded-lg">
              <div className="flex space-x-3 w-full">
                <img
                  // src={FRONT_URL + "Assets/user-icon.png"}
                  src={userIcon}
                  className="w-11 h-10"
                />

                <div className="flex flex-col md:flex-row w-full  justify-between md:items-center cursor-default">
                  <span className="font-medium">{reply?.attributes?.Name}</span>
                  <div className="flex space-x-2 items-center ">
                    <span className="text-gray-600">{`${dateIST} at ${timeIST}`}</span>
                    <img
                      // src={FRONT_URL + "Assets/reply.png"}
                      src={replyIcon}
                      className="cursor-pointer w-5"
                      title="Reply"
                      onClick={() => handleReply(reply)}
                    />
                  </div>
                </div>
              </div>
              <p className=" md:ml-14 cursor-default">
                {reply?.attributes?.Comment}
              </p>
              {renderNestedReplies(reply.id)}
            </div>
          );
        })}
      </div>
      // {nestedReplies.map((reply) => (
      //   <div key={reply.id}>
      //     <p>{reply.content}</p>
      //     {renderNestedReplies(reply.id)}
      //   </div>
      // ))}
      //   </div>
    );
  };

  const fetchData = async () => {
    setIsLoading(true);
    await axios
      .get(`${BASE_URL}/api/blogs/${blogId}?populate=*`)
      .then((res) => {
        // console.log(res.data.data);

        setBlogData(res.data.data);
        setFetchedComments(res.data.data.attributes.comments.data);

        // console.log("cmnts", res.data.data.attributes.comments.data);

        const parsedParagraphs = res?.data?.data?.attributes?.Description.map(
          (paragraph) => {
            let formattedParagraph = paragraph;

            // Replace **bold text** with <strong> tags
            formattedParagraph = formattedParagraph.replace(
              /\*\*(.*?)\*\*/g,
              "<strong>$1</strong>"
            );

            // Replace new lines with <br> tags
            formattedParagraph = formattedParagraph.replace(/\n/g, "<br>");

            return formattedParagraph;
          }
        );
        // console.log(parsedParagraphs);

        setParagraphs(parsedParagraphs);

        const dateTime = new Date(res.data.data?.attributes?.createdAt);

        const dateIST = dateTime.toLocaleDateString("en-IN", options);
        const timeIST = dateTime.toLocaleTimeString("en-IN", timeOptions);

        setPostDate(dateIST);
        setPostTime(timeIST);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [isCommentLoading]);

  return (
    <>
      <Helmet>
        <meta name="keywords" content={blogData?.attributes?.MetaKeywords} />
        <meta name="description" content={blogData?.attributes?.MetaContent} />
      </Helmet>
      <div className="w-full mt-10 flex justify-center items-center min-h-[74vh]">
        <div className="flex min-h-[50vh] w-[80%] bg-[#FFFFFF99] rounded-md px-3 md:px-8 py-8 md:py-4   flex-col items-center space-y-8">
          <div className="w-full flex justify-start">
            <div className="flex flex-col items-center justify-center w-fit">
              <div
                className="w-8 h-8 rounded-full flex justify-center items-center bg-orange-500 cursor-pointer"
                onClick={handleBack}
              >
                <MdArrowBack className="text-white" />
              </div>
              <span className="cursor-default">Back</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold cursor-default">
            {blogData?.attributes?.Title}
          </h2>
          <p className="w-full text-right text-gray-600">{`${postDate}`}</p>
          <div>
            {paragraphs.map((paragraph, index) => (
              <p
                className="cursor-default mt-5"
                key={index}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              ></p>
            ))}
          </div>
          {/* <p className="py-5 text-justify cursor-default">
            {blogData?.attributes?.Description}
          </p> */}
          {!isLoading && (
            <div
              className="flex flex-col w-full pt-14 space-y-8"
              ref={commentBoxRef}
            >
              <div className="w-full flex flex-col md:flex-row space-y-5 md:space-y-0 justify-between">
                <h4 className="text-2xl font-semibold cursor-default  ">{`Comments (${blogData?.attributes?.comments?.data.length})`}</h4>
                <button
                  className="px-3 py-2 bg-orange-500 text-white rounded-md"
                  onClick={() => {
                    setIsActive(true);
                    setReplyTo(null);
                  }}
                >
                  Leave a comment
                </button>
              </div>

              {isActive && (
                <div className="flex w-full justify-center">
                  <div className="flex flex-col space-y-5 w-[95%] md:w-[70%] bg-[#FFFFFFCC] rounded-lg items-center py-8">
                    {replyTo && (
                      <p>
                        {`Reply To: `}
                        <strong>{replyTo?.attributes?.Name}</strong>
                      </p>
                    )}
                    <input
                      type="text"
                      placeholder="Name*"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-md w-[90%] outline-none font-medium py-3 px-5 bg-slate-100"
                    />
                    <div className="w-[90%] flex flex-col space-y-2">
                      <input
                        type="email"
                        placeholder="Email*"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-md w-full outline-none font-medium py-3 px-5 bg-slate-100"
                      />
                      <p className="cursor-default text-sm">
                        Your E-mail will not be displayed
                      </p>
                    </div>
                    <textarea
                      placeholder="Comment*"
                      rows={8}
                      cols={15}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="rounded-md resize-none w-[90%] outline-none font-medium py-3 px-5 bg-slate-100"
                    />
                    <div className="flex justify-center space-x-5 items-center">
                      <button
                        className="px-3 py-2 bg-red-500 text-white rounded-md"
                        onClick={() => handleCancel()}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-6 py-2 bg-green-500 text-white rounded-md relative"
                        onClick={() => postComment()}
                      >
                        Post
                        {isCommentLoading ? (
                          <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-30 text-white z-50">
                            <CircularProgress
                              color="inherit"
                              size="2rem"
                              className="self-center"
                            />
                          </div>
                        ) : null}
                      </button>
                    </div>
                    {emptyField && (
                      <p className="text-red-500">Please fill All the fields</p>
                    )}
                    {!isValidEmail && (
                      <p className="text-red-500">Please fill correct email</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col w-full items-center">
                {fetchedComments.map((comment) => {
                  if (comment.attributes.parentId) return;
                  const dateTime = new Date(comment?.attributes?.createdAt);

                  const dateIST = dateTime.toLocaleDateString("en-IN", options);
                  const timeIST = dateTime.toLocaleTimeString(
                    "en-IN",
                    timeOptions
                  );

                  return (
                    <div className="flex flex-col border-b-2 border-dotted border-b-slate-700 space-y-5 w-full md:w-4/5 px-5 py-4 rounded-lg">
                      <div className="flex space-x-3 w-full">
                        <img
                          alt="no"
                          // src="./Assets/user-icon.png"
                          src={userIcon}
                          // src={FRONT_URL + "Assets/user-icon.png"}
                          className="w-11 h-10"
                        />

                        <div className="flex flex-col md:flex-row w-full  justify-between md:items-center cursor-default">
                          <span className="font-medium">
                            {comment?.attributes?.Name}
                          </span>
                          <div className="flex space-x-2 items-center ">
                            <span className="text-gray-600">{`${dateIST} at ${timeIST}`}</span>
                            <img
                              // src={FRONT_URL + "Assets/reply.png"}
                              src={replyIcon}
                              className="cursor-pointer w-5"
                              title="Reply"
                              onClick={() => handleReply(comment)}
                            />
                          </div>
                        </div>
                      </div>
                      <p className=" md:ml-14 cursor-default">
                        {comment?.attributes?.Comment}
                      </p>
                      {renderNestedReplies(comment?.id)}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-30 text-white z-50">
          <CircularProgress
            color="inherit"
            size="7rem"
            className="self-center"
          />
        </div>
      ) : null}
    </>
  );
};

export default BlogPage;
