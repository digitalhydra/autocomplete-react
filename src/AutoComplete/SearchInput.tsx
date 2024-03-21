import { useRef, useState, useEffect } from "react";

type SearchInputProps = {
  suggestion: string;
  searchCallback: Function;
  handleUserInteraction: Function;
  hasResults: boolean;
};

export default function SearchInput({
  suggestion,
  handleUserInteraction,
  searchCallback,
  hasResults,
}: SearchInputProps) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const inputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (suggestion) {
      // I access the input by ref so I can set the selection range with the current value
      (inputRef.current as HTMLInputElement).value = suggestion;
      inputRef?.current?.setSelectionRange(
        searchInput.length,
        suggestion.length,
      );
      setSearchInput(suggestion);
    }
  }, [suggestion]);

  // debouncing the user input so we don't trigger a request for every letter
  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      searchCallback(userInput);
    }, 500);
    return () => clearTimeout(debounceHandler);
  }, [userInput, searchCallback]);

  const handleUserInput = (input: string): void => {
    setUserInput(input);
    setSearchInput(input);
  };

  return (
    <input
      ref={inputRef}
      value={searchInput}
      onChange={(e) => handleUserInput(e.target.value)}
      onKeyDown={(e) => handleUserInteraction(e)}
      className="autocomplete__input"
      placeholder="Search books by title"
      aria-label="Search books by title"
      role="combobox"
      aria-haspopup="listbox"
      aria-owns="autocomplete-results"
      aria-autocomplete="list"
      aria-controls="autocomplete-results"
      aria-expanded={hasResults}
      type="text"
    />
  );
}
