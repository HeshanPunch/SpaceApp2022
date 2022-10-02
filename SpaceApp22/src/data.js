const getData = () => {
  console.log("getting Data...");
  fetch("./vocab.JSON")
    .then((res) => res.json())
    .then((data) => console.log(data));
};

getData();
