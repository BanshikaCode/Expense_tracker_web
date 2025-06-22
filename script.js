const form = document.getElementById('expense-form');
const list = document.getElementById('expense-list');
const total = document.getElementById('total');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function updateTotal() {
  const sum = expenses.reduce((acc, item) => acc + item.amount, 0);
  total.textContent = sum;
}

function render() {
  list.innerHTML = '';
  expenses.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.description} - ₹${item.amount}
      <button onclick="removeExpense(${index})">X</button>
    `;
    list.appendChild(li);
  });
  updateTotal();
}

function removeExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  render();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const desc = document.getElementById('description').value;
  const amt = parseFloat(document.getElementById('amount').value);
  expenses.push({ description: desc, amount: amt });
  localStorage.setItem('expenses', JSON.stringify(expenses));
  form.reset();
  render();
});

render();
