# Budget Application
This application allows tracking of spending in various spending categories.

# Usage
In order to run the application, go to ``https://expo.io/@pnavara/BudgetApp`` and scan the QR code with the Expo App.

Once the application is running, if the user has an account, they may log in. If not, the user will need to sign up with a valid email.

After logging in, the user will be welcomed with their ``Overview`` displaying the three most recent transactions, the amount of budget left, and a graph displaying the percentage spent in each category. Here, the user can press the ``Add a Transaction`` button to report a transaction. They can also press the ``Recent Transactions`` list to see all the tansactions. Inside this page, the user can filter the transactions by month. Back in ``Overview``, the user can press the ``Budget`` to view the amount of budget that is left per category. Pressing ``Spending`` allows the user to see the breakdown of percentages per category.

In the ``Alerts`` tab, the user will recieve a message when a transaction has been submitted.

Under ``Settings``, the user can change their profile name as well as the budget set per category. Here, the user can also ``Log out``.

# Known bugs/issues
- In settings, the username does not display after 'Welcome'.
- ``Add a Transaction`` modal does not apply KeyboardAvoidingView properly on Android.
