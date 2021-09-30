import React, { useEffect, useRef, useState } from "react";
import Check from "./components/Check/Check";
import Button from "./components/Button/Button";
import Error from "./components/Error/Error";

import { fetchChecks } from "./api";

import "./App.scss";

function App() {
  const [items, setItems]: [any, any] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState(0);

  const updateResponse = (items: any): any => {
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

  const getIndex = (items: any, id: any): any => {
    return items.findIndex((item: any) => {
      return item.id === id;
    });
  };

  const handleToggleCheck = (id: any, value: string) => {
    let newItems: any = [...items];
    const selectedIndex = getIndex(newItems, id);

    // modify checked state
    newItems = newItems.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          checked: value === "yes",
        };
      }

      return item;
    });

    // logic for when the value is no
    if (value === "no") {
      newItems = newItems.map((item: any, index: number) => {
        if (index > selectedIndex) {
          return {
            ...item,
            enabled: false,
          };
        }

        return item;
      });
    }

    if (value === "yes") {
      if (selectedIndex < newItems.length - 1)
        newItems[selectedIndex + 1].enabled = true;

      /**
       * Go through the entire array and enable/disable
       * based on whether the previous one is checked or not.
       * Skips the selected item though.
       */
      newItems = newItems.map((item: any, index: number, arr: any) => {
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
      });
    }
    setItems(newItems);
  };

  const isAllChecked = () => {
    return items.every((item: any) => {
      return item.checked === true;
    });
  };

  const isOneUnchecked = () => {
    return items.some((item: any) => {
      return item.checked === false;
    });
  };

  const isSubmitEnabled = () => {
    return isAllChecked() || isOneUnchecked();
  };

  useEffect(() => {
    fetchChecks()
      .then((res: any) => {
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

  const handleKeyDown = (e: any) => {
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

  const handleRadioPress = (e: any, yesRef: any, noRef: any, id: any) => {
    if (
      e.key === "ArrowDown" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight"
    ) {
      e.preventDefault();
    }

    if (e.key === "1") {
      yesRef.current.checked = true;
      noRef.current.checked = false;
      handleToggleCheck(id, "yes");
    } else if (e.key === "2") {
      yesRef.current.checked = false;
      noRef.current.checked = true;
      handleToggleCheck(id, "no");
    }
  };

  const ulRef = useRef<HTMLUListElement>(null);

  return (
    <div className="App">
      {error ? (
        <Error>There was an Error</Error>
      ) : !loading ? (
        <>
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
          <Button isSubmitEnabled={isSubmitEnabled}>Submit</Button>
        </>
      ) : null}
    </div>
  );
}

export default App;
