import React from "react";
import { Entry } from "../libs/api";

type ResultsProps = {
  results: Entry[] | null;
  selectedValue: number;
  hightlight: string;
  selectOption: Function;
};

type HighlightProps = {
  text: string;
  highlight: string;
};

function Hightlighter({ text = "", highlight = "" }: HighlightProps) {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  // create a reg using the search term and split the option text and set the hightlight as a semantic mark element
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.filter(String).map((part, i) => {
        return regex.test(part) ? (
          <mark key={i}>{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </span>
  );
}

export default function Results({
  hightlight,
  results,
  selectedValue,
  selectOption,
}: ResultsProps) {
  return (
    <ul
      id="autocomplete-results"
      role="listbox"
      className="autocomplete__results"
    >
      {results &&
        results?.map((entry: Entry, index: number) => {
          return (
            <li
              onClick={() => selectOption(index)}
              key={entry.key}
              id={`autocomplete-result${index}`}
              className={`autocomplete__result ${selectedValue === index ? "autocomplete__result--active" : ""}`}
              role="option"
              aria-selected={selectedValue === index}
            >
              <Hightlighter text={entry.name} highlight={hightlight} />
            </li>
          );
        })}
    </ul>
  );
}
