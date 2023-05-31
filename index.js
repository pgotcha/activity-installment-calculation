const fs = require("fs");

fs.readFile("activity.json", "utf-8", function (err, data) {
  if (err) throw err;

  const obj = JSON.parse(data);
  const { publication } = obj[0];
  const { publicationTransactions } = publication;

  const activityDate = new Date(obj[0].createdDate); //ACTUAL
  realizarFiltro(activityDate, publicationTransactions);

  const activityDateCuota1 = new Date("2023-05-22T20:58:38.052Z"); //CUOTA 1
  realizarFiltro(activityDateCuota1, publicationTransactions);
  
  const activityDateCuota2 = new Date("2023-05-31T20:10:26.057Z"); //CUOTA 2
  realizarFiltro(activityDateCuota2, publicationTransactions);

  const activityDateCuota3 = new Date("2023-05-31T20:15:37.104Z"); //CUOTA 3
  realizarFiltro(activityDateCuota3, publicationTransactions);
  
});

const realizarFiltro = (activityDate, publicationTransactions) => {
  console.log("🚀 activityDate:", activityDate);

  const { paymentTerm } = publicationTransactions.find(
    (item) => item.transactionType == "DOWN_PAYMENT"
  );
  console.log("🚀 paymentTerm:", paymentTerm);

  const downPaymentIndex = publicationTransactions.findIndex(
    (item) => item.transactionType == "DOWN_PAYMENT"
  );
  console.log("🚀 downPaymentIndex:", downPaymentIndex);

  const fil = publicationTransactions.findIndex((item) => {
    const itemDate = new Date(item.startTime);
    return itemDate <= activityDate && item.transactionType == "PAYMENT";
  });
  const { hash } = publicationTransactions[fil];
  console.log("🚀 hash:", hash);
  
  console.log(
    `Cuota ${downPaymentIndex - fil} de ${paymentTerm} con hash = ${hash}`
  );
};
