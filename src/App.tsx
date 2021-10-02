import React, { useEffect, useRef, useState } from "react";

import Check from "./components/Check/Check";
import Button from "./components/Button/Button";
import Error from "./components/Error/Error";
import Success from "./components/Success/Success";

import { Checked, Pressed } from "./constants/constants";

import {
  InputKeyBoardEventType,
  InputRefType,
  Item,
  ItemNew,
  UListRefType,
} from "./interfaces/interface";

import { fetchChecks, submitCheckResults } from "./api";

import "./App.scss";
import { isSubmitEnabled, getIndex } from "./utils/utils";

function App() {
  const [items, setItems] = useState<ItemNew[] | []>([]);
  const [error, setError] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cursor, setCursor] = useState<number>(0);

  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [hideForm, setHideForm] = useState<boolean>(false);

  const updateResponse = (items: Item[]): ItemNew[] => {
    return items
      .sort((a: any, b: any) => a.priority - b.priority)
      .map((item: any, index: number) => {
        return {
          ...item,
          enabled: index === 0,
          checked: undefined,
        };
      });
  };

  const handleToggleCheck = (id: string, value: string) => {
    let newItems: ItemNew[] = [...items];
    const selectedIndex = getIndex(newItems, id);

    // modify checked state
    newItems = newItems.map((item: ItemNew) => {
      if (item.id === id) {
        return {
          ...item,
          checked: value === Checked.Yes,
        };
      }

      return item;
    });

    // logic for when the value is no
    if (value === Checked.No) {
      newItems = newItems.map((item: ItemNew, index: number) => {
        if (index > selectedIndex) {
          return {
            ...item,
            enabled: false,
          };
        }

        return item;
      });
    }

    if (value === Checked.Yes) {
      if (selectedIndex < newItems.length - 1)
        newItems[selectedIndex + 1].enabled = true;

      /**
       * Go through the entire array and enable/disable
       * based on whether the previous one is checked or not.
       * Skips the selected item though.
       */
      newItems = newItems.map(
        (item: ItemNew, index: number, arr: ItemNew[]) => {
          if (index > selectedIndex) {
            if (
              arr[index - 1].checked === true &&
              arr[index - 1].enabled === true
            ) {
              // previous one is checked
              arr[index].enabled = true;
            }
          }

          return item;
        }
      );
    }

    // update the state to reflect new changes
    setItems(newItems);

    /**
     * update cursor value to current selected index to
     * be in sync with keyboard navigation*/
    setCursor(selectedIndex);
  };

  useEffect(() => {
    fetchChecks()
      .then((res: Item[]) => {
        const result = [...res];
        setItems(updateResponse(result));
      })
      .catch((error) => {
        console.log("there was an error", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleKeyDown = (e: UListRefType) => {
    if (
      e.key === "ArrowUp" &&
      cursor > 0 &&
      items[cursor - 1].enabled === true
    ) {
      setCursor((prevCursor) => prevCursor - 1);
    } else if (
      e.key === "ArrowDown" &&
      cursor < items.length - 1 &&
      items[cursor + 1].enabled === true
    ) {
      setCursor((prevCursor) => prevCursor + 1);
    }
  };

  useEffect(() => {
    if (ulRef.current) {
      (
        ulRef.current.children[cursor].querySelector(
          `.toggle-switch input[name=switch-${items[cursor].id}]`
        ) as HTMLElement
      ).focus();
    }
  }, [cursor, items]);

  const handleRadioPress = (
    e: InputKeyBoardEventType,
    yesRef: InputRefType | null,
    noRef: InputRefType | null,
    id: string
  ) => {
    if (
      e.key === Pressed.ArrowDown ||
      e.key === Pressed.ArrowUp ||
      e.key === Pressed.ArrowLeft ||
      e.key === Pressed.ArrowRight
    ) {
      e.preventDefault();
    }

    if (e.key === Pressed.One) {
      if (yesRef?.current && noRef?.current) {
        yesRef.current.checked = true;
        noRef.current.checked = false;
      }
      handleToggleCheck(id, Checked.Yes);
    } else if (e.key === Pressed.Two) {
      if (yesRef?.current && noRef?.current) {
        yesRef.current.checked = false;
        noRef.current.checked = true;
      }
      handleToggleCheck(id, Checked.No);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCheckResults(items)
      .then((_res: ItemNew[]) => {
        setSubmitSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        setSubmitSuccess(false);
        console.log("there was an error", error);
      })
      .finally(() => {
        setHideForm(true);
      });
  };

  const ulRef = useRef<HTMLUListElement>(null);

  const ShowSubmitSuccess = <Success>The form was successfully submitted!! Redirecting...</Success>;
  const ShowSubmitError = <Error>Couldn't submit the form. Please try again!!</Error>;

  return (
    <div className="App">
      {!hideForm ? (
        <>
          {error ? (
            <Error>There was an Error</Error>
          ) : !loading ? (
            <form onSubmit={(e) => handleSubmit(e)}>
              <ul
                onKeyDown={(e) => handleKeyDown(e)}
                tabIndex={0}
                className="checks"
                ref={ulRef}
              >
                {items.map((item: any, index: number) => {
                  return (
                    <Check
                      key={item.id}
                      item={item}
                      index={index}
                      cursor={cursor}
                      handleRadioPress={handleRadioPress}
                      handleToggleCheck={handleToggleCheck}
                    />
                  );
                })}
              </ul>
              <Button isSubmitEnabled={() => isSubmitEnabled(items)}>
                Submit
              </Button>
            </form>
          ) : null}
        </>
      ) : submitSuccess ? (
        ShowSubmitSuccess
      ) : (
        ShowSubmitError
      )}
    </div>
  );
}

export default App;
