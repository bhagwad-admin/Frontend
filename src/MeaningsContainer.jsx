import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adhyayData from "./Content/Adhyay/index.json";
import { CircularProgress } from "@material-ui/core";

const MeaningsContainer = () => {
  const [groupedData, setGroupedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const wordsWithMeanings = [];

      setIsLoading(true);

      for (const chapter of adhyayData?.chapters) {
        const chapterData = await import(`./Content/Adhyay/${chapter.file}`);

        for (const verse of chapterData.verses) {
          for (const meaningObj of verse.meaning) {
            wordsWithMeanings.push({
              word: meaningObj.word,
              meaning: meaningObj.meaning,
              verseId: verse.id,
              chapterId: chapter.id,
            });
          }
        }
      }

      const sortedWords = wordsWithMeanings.sort((a, b) =>
        a.word.localeCompare(b.word, "en")
      );

      setGroupedData(groupWords(sortedWords));
    };

    fetchData();
  }, []);

  const groupWords = (words) => {
    const groupedData = {};

    words.forEach((word) => {
      const firstLetter = word.word.charAt(0).toUpperCase();

      if (!groupedData[firstLetter]) {
        groupedData[firstLetter] = [word];
      } else {
        groupedData[firstLetter].push(word);
      }
    });

    setIsLoading(false);
    return groupedData;
  };

  if (groupedData === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full mt-10 flex justify-center items-center min-h-[74.8vh]">
        <div className="flex min-h-[50vh] w-[80%] bg-[#FFFFFF99] rounded-md px-3 md:px-8 py-8 md:py-4   flex-col items-center space-y-8">
          <div className="w-full flex flex-col items-center justify-center">
            {Object.entries(groupedData).map(([letter, words]) => (
              <div key={letter} className="w-full flex flex-col items-center">
                <h2 className="my-5 text-4xl md:text-2xl font-semibold cursor-default">
                  {letter}
                </h2>
                <ul>
                  {words.map((wordObj, index) => (
                    <li
                      key={index}
                      className="text-2xl md:text-lg hover:font-semibold hover:underline mb-2 w-full"
                    >
                      <Link
                        to={`/meaning/chapter/${wordObj.chapterId}/verse/${wordObj.verseId}/${wordObj.word}`}
                      >
                        {wordObj.word}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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

export default MeaningsContainer;
