import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import adhyayData from "./Content/Adhyay/index.json";
import { MdArrowBack } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";

const VersePage = () => {
  const { chapterId, verseId } = useParams();
  const navigate = useNavigate();

  const [chapterData, setChapterData] = useState(null);
  const [verseData, setVerseData] = useState(null);
  const [verseTextWithLinks, setVerseTextWithLinks] = useState(null);

  const chapter = adhyayData.chapters.find(
    (chapter) => chapter.id === parseInt(chapterId, 10)
  );

  const fetchChapterData = async () => {
    try {
      const chapterResponse = await import(`./Content/Adhyay/${chapter.file}`);
      //   const data = await chapterResponse.json();
      //   console.log("chapterdata", chapterResponse.default);
      setChapterData(chapterResponse.default);
      setVerseData(chapterResponse.default.verses[verseId - 1]);

      const data = chapterResponse.default.verses[verseId - 1].bhavarth
        .split(" ")
        .map((word, index) => {
          const meaning = chapterResponse.default.verses[
            verseId - 1
          ].meaning.find((meaningObj) => meaningObj.word === word);
          if (meaning) {
            return (
              <React.Fragment key={index}>
                <Link
                  key={index}
                  className="font-semibold "
                  to={`/meaning/chapter/${chapterId}/verse/${verseId}/${meaning.word}`}
                >
                  {word}
                </Link>{" "}
              </React.Fragment>
            );
          }
          return <React.Fragment key={index}>{word} </React.Fragment>;
        });

      setVerseTextWithLinks(data);

      //   console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    navigate(`/chapters/${chapterId}`);
  };

  const handleNext = () => {
    const size = chapterData?.verses?.length;

    let newVerseId = verseId;
    let newChapterId = chapterId;

    if (newVerseId == size) {
      if (newChapterId == 18) newChapterId = 1;
      else newChapterId++;

      newVerseId = 1;
    } else {
      newVerseId++;
    }
    setChapterData(null);
    setVerseData(null);

    navigate(`/verses/chapter/${newChapterId}/verse/${newVerseId}`);
  };

  const handlePrev = async () => {
    // const size = chapterData?.verses?.length;

    let newVerseId = verseId;
    let newChapterId = chapterId;

    if (newVerseId == 1) {
      if (newChapterId == 1) newChapterId = 18;
      else newChapterId--;

      const prevChapter = adhyayData?.chapters.find(
        (chapter) => chapter?.id === parseInt(newChapterId, 10)
      );

      const prevChapterResponse = await import(
        `./Content/Adhyay/${prevChapter.file}`
      );
      const size = prevChapterResponse.default?.verses?.length;

      newVerseId = size;
    } else {
      newVerseId--;
    }
    setChapterData(null);
    setVerseData(null);

    navigate(`/verses/chapter/${newChapterId}/verse/${newVerseId}`);
  };

  useEffect(() => {
    fetchChapterData();
  }, [verseId]);

  return (
    <div className="w-full mt-10 flex justify-center items-center min-h-[74.8vh]">
      <div className="flex w-[80%] bg-[#FFFFFF99] rounded-md px-3 md:px-8 py-8 md:py-4   flex-col items-center space-y-8">
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
        <h2 className="text-3xl font-bold text-center cursor-default">{`Adhyay ${chapterId} - Shloka ${verseId}`}</h2>
        <h4 className="text-center text-lg font-semibold cursor-default">
          {verseData?.shloka}
        </h4>
        {/* <p>{verseData?.bhavarth}</p> */}
        <p className="cursor-default">{verseTextWithLinks}</p>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col items-center justify-center w-fit">
            <div
              className="w-8 h-8 rounded-full flex justify-center items-center bg-orange-500 cursor-pointer"
              onClick={handlePrev}
            >
              <MdArrowBack className="text-white" />
            </div>
            <span className="cursor-default">Previous</span>
          </div>
          <div className="flex flex-col items-center justify-center w-fit">
            <div
              className="w-8 h-8 rounded-full flex justify-center items-center bg-orange-500 cursor-pointer"
              onClick={handleNext}
            >
              <BsArrowRight className="text-white" />
            </div>
            <span className="cursor-default">Next</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersePage;
