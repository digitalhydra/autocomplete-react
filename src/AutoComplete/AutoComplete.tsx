import { useState, useCallback, useEffect } from "react";
import { Entry, getBooksByTitle } from "../libs/api";
import Results from "./Results";
import SearchInput from "./SearchInput";
import "./styles.css";

export default function AutoComplete() {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [results, setResults] = useState<Entry[] | null>(null);
  const [suggestion, setSuggestion] = useState<string>("");
  const [currentInput, setCurrentInput] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);
  const resultsCount: number | null = (results as Entry[])?.length;

  const searchSuggestions = useCallback(async (input: string) => {
    if (input === "") {
      setResults(null);
      return;
    }
    try {
      setFetching(true);
      const countriesResults = await getBooksByTitle(input);
      if (countriesResults.length) {
        setSelectedOption(0);
        setResults(countriesResults);
        setSuggestion(countriesResults[selectedOption]?.name);
        setCurrentInput(input);
      } else {
        setResults(null);
      }
    } catch (error) {
      setResults(null);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setFetching(false);
  }, [results]);

  const getItemByIndex = (index: number): Entry => {
    return results?.find(
      (item: Entry, itemIndex: number) => index === itemIndex,
    ) as Entry;
  };

  const handleOptionClick = (index: number): void => {
    if (!results) return;
    setSuggestion(getItemByIndex(index).name);
    setResults(null);
  };

  const handleUserInteraction = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    const { key } = event;
    if (resultsCount < 1) {
      return;
    }
    let resultElement = null;
    let nextOption = 0;
    switch (key) {
      case "Escape":
        setResults(null);
        break;
      case "ArrowUp":
        if (!results) return;
        if (selectedOption <= 0) {
          nextOption = resultsCount - 1;
          setSelectedOption(nextOption);
          setSuggestion(getItemByIndex(nextOption).name);
        } else {
          nextOption = selectedOption - 1;
          setSelectedOption(nextOption);
          setSuggestion(getItemByIndex(nextOption).name);
        }
        break;
      case "ArrowDown":
        if (!results) return;
        if (selectedOption === -1 || selectedOption >= resultsCount - 1) {
          nextOption = 0;
          setSelectedOption(0);
          setSuggestion(getItemByIndex(0).name);
        } else {
          nextOption = selectedOption + 1;
          setSelectedOption(nextOption);
          setSuggestion(getItemByIndex(nextOption).name);
        }
        break;
      case "Enter":
        if (!results) return;
        setSuggestion(getItemByIndex(selectedOption).name);
        setResults(null);
        return;
      case "Tab":
        if (!results) return;
        setSuggestion(getItemByIndex(selectedOption).name);
        setResults(null);
        return;
      default:
        return;
    }
    // scroll the result item into view if user moves with arrows
    resultElement = document.getElementById("autocomplete-result" + nextOption);
    resultElement?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };

  return (
    <fieldset className="autocomplete">
      {fetching && <div className="autocomplete__loader" />}
      <SearchInput
        suggestion={suggestion}
        hasResults={resultsCount > 1}
        handleUserInteraction={handleUserInteraction}
        searchCallback={searchSuggestions}
      />
      <button
        type="button"
        aria-label="Search"
        className="autocomplete__button"
      >
        Search
      </button>
      {results && (
        <Results
          selectOption={handleOptionClick}
          hightlight={currentInput}
          results={results}
          selectedValue={selectedOption}
        />
      )}
    </fieldset>
  );
}
