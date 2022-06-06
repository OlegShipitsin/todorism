import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/store";
import { Item } from "../../store/types";

const CreateForm = () => {
  const dispatch = useDispatch();
  const [itemTitle, setItemTitle] = useState<Item["title"]>("");
  const [itemAmount, setItemAmount] = useState<Item["amount"]>(1);
  const itemRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemTitle(event.target.value);
  };
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemAmount(Number(event.target.value));
  };
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const item: Item = {
      id: Date.now(),
      checked: false,
      peopleIDs: [],
      amount: 1,
      title: itemTitle,
    };
    dispatch(addItem(item));
    setItemTitle("");
    setItemAmount(1);

    itemRef.current?.focus();
  };

  useEffect(() => {
    itemRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="title">Title</label>
      <input
        ref={itemRef}
        id="title"
        type="text"
        value={itemTitle}
        onChange={handleTitleChange}
        placeholder="Milk"
      />
      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        name="amount"
        id="amount"
        placeholder="42"
        value={itemAmount}
        onChange={handleAmountChange}
      />
      <button type="submit">➕ Add</button>
    </form>
  );
};

export default CreateForm;
