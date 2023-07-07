import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import adhyayData from "./Content/Adhyay/index.json";

const MeaningPage = () => {
  const { chapterId, verseId, word } = useParams();

  const [meaningData, setMeaningData] = useState(null);
  //   const [chapterId,setChapterId] = useState()

  const chapter = adhyayData.chapters.find(
    (chapter) => chapter.id === parseInt(chapterId, 10)
  );

  const fetchChapterData = async () => {
    try {
      const chapterResponse = await import(`./Content/Adhyay/${chapter.file}`);

      const meaningObj = chapterResponse.default.verses[
        verseId - 1
      ].meaning.find((meaning) => meaning.word === word);

      setMeaningData(meaningObj);

      //   console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChapterData();
  }, [word]);

  return (
    <div className="w-full mt-10 flex justify-center items-center min-h-[74.8vh]">
      <div className="flex min-h-[50vh] w-[80%] bg-[#FFFFFF99] rounded-md px-3 md:px-8 py-8 md:py-4   flex-col items-center space-y-8">
        <h2 className="text-5xl font-bold cursor-default">
          {meaningData?.word}
        </h2>
        <p className="cursor-default">{meaningData?.meaning}</p>
      </div>
    </div>
  );
};

export default MeaningPage;
