const vocabResId = "52fc9f2d-255f-4b8e-9aaf-6ed027690bf0";

const loadData = async () => {
  await getVocabData();
};

const getVocabData = async (limit) => {
  const apiUrl = `https://donnees-data.asc-csa.gc.ca/en/api/3/action/datastore_search?resource_id=${vocabResId}`;

  let myHeader = new Headers();
  myHeader.append("Content-Type", "application/json");
  //   res.header('Access-Control-Allow-Origin', '*');
  myHeader.append("Access-Control-Allow-Origin", "http://192.168.0.110:5500");

  let request = new Request(apiUrl, {
    method: "GET",
    headers: myHeader,
    mode: "cors",
  });

  console.log("getVocabData");
  fetch(request)
    .then((response) => console.log(response))
    .then((data) => console.log(data));
};
