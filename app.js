var budget = '';

function totalBudget() {
  var budgetInput = document.getElementById("budgetInput");
  budget = +(budgetInput.value);
  document.querySelector('#budgetInput').value ='';

  if (!isNaN(budget)) {
    updateFinalCalculations();
    budgetInput.enable = true;
  }
}


var expenses = [];

function addExpense() {
  var nameInput = document.getElementById("expenseNameInput");
  var amountInput = document.getElementById("expenseAmountInput");

  var name = nameInput.value;
  var amount = parseFloat(amountInput.value);

  if (name !== "" && !isNaN(amount)) {
    expenses.push({ name: name, amount: amount });
    nameInput.value = "";
    amountInput.value = "";

    updateExpenseList();
    updateFinalCalculations();
  }
}

function removeExpense(index) {
  expenses.splice(index, 1);
  updateExpenseList();
  updateFinalCalculations();
}

function updateExpenseList() {
  var expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";

  for (var i = 0; i < expenses.length; i++) {
    var expense = expenses[i];
    var listItem = document.createElement("div");
    listItem.classList.add("expense-list")
    listItem.innerHTML = expense.name + " : ------------------------------------------------------------------------------------------>"  +expense.amount.toFixed(2) + " PKR ";

    var removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    removeButton.onclick = (function (index) {
      return function () {
        removeExpense(index);
      };
    })(i);

    listItem.appendChild(removeButton);
    expenseList.appendChild(listItem);
  }
}

function  updateFinalCalculations() {
  var totalBudget = document.getElementById("totalBudget");
  var totalExpenses = document.getElementById("totalExpenses");
  var remainingAmount = document.getElementById("remainingAmount");

  totalBudget.textContent = budget.toFixed(2)+" PKR";

  var totalExpenseAmount = expenses.reduce(function (total, expense) {
    return total + expense.amount;
  }, 0);
  totalExpenses.textContent = totalExpenseAmount.toFixed(2)+" PKR";

  var remaining = budget - totalExpenseAmount;
  remainingAmount.textContent = remaining.toFixed(2)+" PKR";
}
