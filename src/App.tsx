import React, { useEffect, useState } from "react";
import Check from "./components/Check/Check";
import Button from "./components/Button/Button";
import Error from "./components/Error/Error";

import { fetchChecks } from "./api";

import "./App.scss";

function App() {
  const [items, setItems]: [any, any] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="App">
      {error ? (
        <Error>There was an Error</Error>
      ) : !loading ? (
        <>
          <ul className="checks">
            {items.map((item: any, index: number) => {
              return (
                <Check
                  key={item.id}
                  item={item}
                  index={index}
                  handleToggleCheck={handleToggleCheck}
                />
              );
            })}
          </ul>
          <Button>Submit</Button>
        </>
      ) : null}
    </div>
  );
}

export default App;
