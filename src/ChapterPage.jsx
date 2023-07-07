import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import adhyayData from "./Content/Adhyay/index.json";
import { MdArrowBack } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { Helmet } from "react-helmet";

const ChapterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chapterData, setChapterData] = useState(null);
  const [paragraphs, setParagraphs] = useState([]);
  //   const [chapterId,setChapterId] = useState()

  const chapter = adhyayData.chapters.find(
    (chapter) => chapter.id === parseInt(id, 10)
  );

  const handleNext = () => {
    let chapterId = parseInt(id);

    if (chapterId == 18) chapterId = 1;
    else chapterId = chapterId + 1;
    setChapterData(null);

    navigate(`/chapters/${chapterId}`);
  };

  const handlePrev = () => {
    let chapterId = parseInt(id);

    if (chapterId == 1) chapterId = 18;
    else chapterId = chapterId - 1;

    setChapterData(null);
    navigate(`/chapters/${chapterId}`);
  };

  //   console.log("chapter", chapter);

  const fetchChapterData = async () => {
    try {
      const chapterResponse = await import(`./Content/Adhyay/${chapter.file}`);
      //   const data = await chapterResponse.json();
      // console.log("chapterdata", chapterResponse.default);
      setChapterData(chapterResponse.default);

      const parsedParagraphs = chapterResponse.default.about.map(
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

      console.log(parsedParagraphs);

      setParagraphs(parsedParagraphs);

      //   console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChapterData();
  }, [id]);

  return (
    <>
      <Helmet>
        <meta name="keywords" content={chapterData?.keywords} />
        <meta name="description" content={chapterData?.description} />
      </Helmet>
      <div className="w-full mt-10 flex justify-center items-center min-h-[74.8vh]">
        <div className="flex min-h-[50vh] w-[80%] bg-[#FFFFFF99] rounded-md px-3 md:px-8 py-8 md:py-4   flex-col items-center space-y-8">
          <h2 className="text-3xl font-bold text-center cursor-default">
            {chapterData?.title}
          </h2>
          <div>
            {paragraphs.map((paragraph, index) => (
              <p
                className="cursor-default mt-5"
                key={index}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              ></p>
            ))}
          </div>
          {/* <p className="cursor-default">{chapterData?.about}</p> */}
          <div className="flex flex-col space-y-8">
            <h4 className="text-2xl font-semibold cursor-default">Shlokas</h4>
            <div className="flex flex-col space-y-5">
              {chapterData?.verses.map((verse, index) => {
                return (
                  <Link
                    to={`/verses/chapter/${id}/verse/${verse.id}`}
                    key={index}
                    replace
                    className="cursor-pointer font-medium hover:font-bold w-fit "
                  >{`Shloka ${id}.${verse.id}`}</Link>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col items-center justify-center w-fit">
              <div
                className="w-8 h-8 rounded-full flex justify-center items-center bg-orange-500 cursor-pointer"
                onClick={handlePrev}
              >
                <MdArrowBack className="text-white" />
              </div>
              <span className="cursor-default">Previous Adhyay</span>
            </div>
            <div className="flex flex-col items-center justify-center w-fit">
              <div
                className="w-8 h-8 rounded-full flex justify-center items-center bg-orange-500 cursor-pointer"
                onClick={handleNext}
              >
                <BsArrowRight className="text-white" />
              </div>
              <span className="cursor-default">Next Adhyay</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterPage;
