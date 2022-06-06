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
    <form onSubmit={handleFormSubmit} className="flex my-4 form-control">
      <label htmlFor="title" className="sr-only">
        Title
      </label>
      <div className="input-group">
        <input
          ref={itemRef}
          id="title"
          type="text"
          value={itemTitle}
          onChange={handleTitleChange}
          placeholder="Milk"
          className="input input-bordered w-full max-w-xs"
        />
        <label htmlFor="amount" className="sr-only">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="42"
          value={itemAmount}
          onChange={handleAmountChange}
          className="input input-bordered w-20"
        />
        <button type="submit" className="btn">
          ➕ Add
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
