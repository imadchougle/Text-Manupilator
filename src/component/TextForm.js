import React, { useState, useEffect } from "react";



export default function TextForm(props) {
  const [text, setText] = useState("");
  const [averageWordLength, setAverageWordLength] = useState(0);
  const [mostFrequentWords, setMostFrequentWords] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const [wordCountWithSpaces, setWordCountWithSpaces] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [longestWord, setLongestWord] = useState("");
  const [isPartiallyLowercase, setIsPartiallyLowercase] = useState(false);
  // eslint-disable-next-line
  const [isAllLowercase, setIsAllLowercase] = useState(false);

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
  };
  // eslint-disable-next-line
  const isAllUppercase = text === text.toUpperCase();
  // eslint-disable-next-line
  const isPartiallyUppercase = text !== text.toLowerCase();

  const copyText = () => {
    navigator.clipboard.writeText(text);
    // Optional: Show a message or perform any other action after copying
    alert("Text copied to clipboard!");
  };

  const onChange = (event) => {
    setText(event.target.value);
  };

  const cleartext = () => {
    setText("");
  };

  useEffect(() => {
    // ... existing code ...

    const isPartiallyLowercase = /[A-Z]/.test(text);
    const isAllLowercase = !isPartiallyLowercase && /[a-z]/.test(text);

    // ... existing code ...

    setIsPartiallyLowercase(isPartiallyLowercase);
    setIsAllLowercase(isAllLowercase);
  }, [text]);

  const lowercase = () => {
    let newtxt = text.toLowerCase();
    setText(newtxt);
  };

  const getSymbols = () => {
    const symbolRegex = /[@#%^$_*+?()[\]{}!|]/g;
    const symbols = text.match(symbolRegex) || [];
    return symbols;
  };

  useEffect(() => {
    const calculateWordCount = () => {
      const words = text
        .trim()
        .split(/\s+/)
        .filter((word) => word !== "");
      const spaces = text.split(/\S+/).filter((space) => space !== "");
      setWordCount(words.length);
      setWordCountWithSpaces(words.length + spaces.length);
    };

    const calculateSentenceCount = () => {
      const sentences = text
        .trim()
        .split(/[.!?]+/)
        .filter((sentence) => sentence !== "");
      setSentenceCount(sentences.length);
    };

    const calculateCharacterCount = () => {
      const characters = text.replace(/\s/g, "");
      setCharacterCount(characters.length);
    };

    const calculateAverageWordLength = () => {
      const words = text.split(" ").filter((word) => word !== "");
      const totalLength = words.reduce((total, word) => total + word.length, 0);
      const averageLength = totalLength / words.length || 0; // Handle division by zero
      setAverageWordLength(averageLength.toFixed(2));
    };

    const findMostFrequentWords = () => {
      const words = text
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word !== "");
      const wordCountMap = new Map();

      words.forEach((word) => {
        if (wordCountMap.has(word)) {
          wordCountMap.set(word, wordCountMap.get(word) + 1);
        } else {
          wordCountMap.set(word, 1);
        }
      });

      const sortedWords = Array.from(wordCountMap.entries()).sort(
        (a, b) => b[1] - a[1]
      );
      const mostFrequent = sortedWords
        .slice(0, 8)
        .map(([word, count]) => ({ word, count }));

      setMostFrequentWords(mostFrequent);
    };

    const findLongestWord = () => {
      const words = text.trim().split(/\s+/);
      let longest = "";

      words.forEach((word) => {
        if (word.length > longest.length) {
          longest = word;
        }
      });

      setLongestWord(longest);
    };

    calculateWordCount();
    calculateSentenceCount();
    calculateCharacterCount();
    calculateAverageWordLength();
    findMostFrequentWords();
    findLongestWord();
  }, [text]);

  const readingTimeSeconds = Math.floor(0.008 * wordCount * 60);
  const minutes = Math.floor(readingTimeSeconds / 60);
  const seconds = readingTimeSeconds % 60;
  const readingTimeFormatted =
    minutes > 0 ? `${minutes}min ${seconds}sec` : `${seconds}sec`;

  const capitalizeSentences = () => {
    const sentences = text.trim().split(/[.!?]+/);
    const capitalizedSentences = sentences.map((sentence) => {
      const trimmedSentence = sentence.trim();
      if (trimmedSentence.length > 0) {
        const firstLetter = trimmedSentence.charAt(0).toUpperCase();
        const restOfSentence = trimmedSentence.slice(1);
        return firstLetter + restOfSentence;
      } else {
        return trimmedSentence;
      }
    });

    const capitalizedText =
      capitalizedSentences.join(". ") + (text.endsWith(".") ? "" : "");
    setText(capitalizedText);

    const words = capitalizedText
      .trim()
      .split(/\s+/)
      .filter((word) => word !== "");
    const spaces = capitalizedText.split(/\S+/).filter((space) => space !== "");
    setWordCount(words.length);
    setWordCountWithSpaces(words.length + spaces.length);
  };

  const capitalizeWords = () => {
    const words = text.trim().split(/\s+/);
    const capitalizedText = words.map((word) => {
      if (word.length > 0) {
        const firstLetter = word.charAt(0).toUpperCase();
        const restOfWord = word.slice(1);
        return firstLetter + restOfWord;
      } else {
        return word;
      }
    });
    setText(capitalizedText.join(" "));
  };





  return (
    <>
      <div>
        <h1>{props.heading}</h1>
        <div className="mb-3 position-relative">
          <textarea
            placeholder="Enter your text here"
            className="form-control"
            id="myBox"
            rows="5"
            value={text}
            onChange={onChange}
            style={{
              color: "blue",
              WebkitTextFillColor: "black",
              fontFamily: "Arial",
            }}
          >
            {" "}
          </textarea>
          <button
            className="btn btn-outline-dark position-absolute top-0 end-0 m-1"
            onClick={copyText}
            style={{
              border: "none",
            }}
            title="copy to clipboard"
          >
            <i className="fas fa-copy"></i>
          </button>
        </div>

        <div className="container my-3">
          <h1>Text Manipulation</h1>
          <div className="btn-group" role="group">
            <button
              className="btn btn-primary"
              onClick={handleUpClick}
              disabled={isAllUppercase}
            >
              Uppercase
            </button>
            <button
              className="btn btn-success"
              onClick={lowercase}
              disabled={!isPartiallyLowercase}
            >
              Lowercase
            </button>
            <button className="btn btn-info" onClick={capitalizeSentences}>
              Capitalize Sentences
            </button>
            <button className="btn btn-warning" onClick={capitalizeWords}>
              Capitalize Words
            </button>
            <button className="btn btn-danger" onClick={cleartext}>
              Clear Text
            </button>
          </div>
        </div>
      </div>

      <div className="container my-3">
        <h1>Text Statistics</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">General</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Character Count:</strong> {characterCount}
                  </li>
                  <li className="list-group-item">
                    <strong>Word Count (excluding spaces):</strong> {wordCount}
                  </li>
                  <li className="list-group-item">
                    <strong>Word Count (including spaces):</strong>{" "}
                    {wordCountWithSpaces}
                  </li>
                  <li className="list-group-item">
                    <strong>Sentence Count:</strong> {sentenceCount}
                  </li>
                  <li className="list-group-item">
                    <strong>Reading Time:</strong> {readingTimeFormatted}
                  </li>
                  <li className="list-group-item">
                    <strong>Total Symbols:</strong> {getSymbols().length}
                  </li>
                  <li className="list-group-item">
                    <strong>Average Word Length:</strong> {averageWordLength}
                  </li>
                  <li className="list-group-item">
                    <strong>Longest Word:</strong> {longestWord}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Most Frequent Words</h5>
                <ul className="list-group list-group-flush">
                  {mostFrequentWords.map(({ word, count }) => (
                    <li
                      key={word}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {word}
                      <span className="badge bg-primary rounded-pill">
                        {count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container my-3">
          <h2>Preview of the Text </h2>

          <div className="card">
            <div className="card-body">
              <button
                className="btn btn-outline-dark position-absolute top-0 end-0 m-1"
                onClick={copyText}
                style={{
                  border: "none",
                }}
                title="Copy to clipboard"
              >
                <i className="fas fa-copy"></i>
              </button>
              <p style={{ marginBottom: "0" }}>{text}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
