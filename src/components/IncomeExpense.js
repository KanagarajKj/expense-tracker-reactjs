export const IncomeExpense = ({ deals }) => {
  let amounts = deals.map((deal) => deal.amount);

  let newAmount = amounts.map((element) => {
    return Number(element);
  });

  let plusTransaction = newAmount.filter((amount) => amount > 0);

  let income = plusTransaction.reduce((acc, amount) => (acc += amount), 0);

  let minusTransaction = newAmount.filter((amount) => amount < 0);

  let expense = minusTransaction.reduce((acc, amount) => (acc += amount), 0);

  const totalBalance = income + expense;

  return (
    <section className="inc_exp">
      <div className="balance_container">
        <h3>Balance</h3>
        <p>₹ {totalBalance}</p>
      </div>
      <div className="inc_exp_container">
        <div className="money">
          <h3>Income</h3>
          <p className="money_plus">₹ {income}</p>
        </div>
        <div className="money">
          <h3>Expense</h3>
          <p className="money_minus">₹ {expense}</p>
        </div>
      </div>
    </section>
  );
};
