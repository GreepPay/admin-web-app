import { Transaction } from "@greep/logic/src/gql/graphql"

type PaymentDetail = {
  title: string
  content: string
}

export const sidebarSections = [
  {
    title: "General",
    items: [
      { title: "Dashboards", icon: "dashboards", route: "/dashboards" },
      { title: "Analytics", icon: "graph", route: "/analytics" },
      { title: "Transactions", icon: "trend-up", route: "/transactions" },
      { title: "Wallets", icon: "wallet-3", route: "/wallets" },
    ],
  },
  {
    title: "Accounts",
    items: [
      { title: "Merchant", icon: "building", route: "/merchants" },
      { title: "Customer", icon: "user", route: "/customers" },
      { title: "Admin", icon: "shield-security", route: "/admin" },
    ],
  },
  {
    title: "Merchant",
    items: [
      {
        title: "Verification",
        icon: "personal-card",
        route: "/verification",
      },
      {
        title: "Withdrawal",
        icon: "money-recieve",
        route: "/withdrawal",
      },
    ],
  },
]

export const mapTransactionToPaymentDetails = (
  tx: Transaction
): PaymentDetail[] => {
  return [
    // {
    //   title: "Role",
    //   content: `${tx.user?.role?.name}`,
    // },
    {
      title: "Amount",
      content: `${tx.amount.toFixed(2)} ${tx.currency} `,
    },
    {
      title: "Fee",
      content: `${tx.charges.toFixed(2)} ${tx.currency} `,
    },
    {
      title: "Account Name",
      content: `${tx.user?.first_name} ${tx.user?.last_name}`,
    },
    {
      title: "Type",
      content: tx.dr_or_cr === "credit" ? "Credit" : "Debit",
    },
    {
      title: "Status",
      content: tx.status,
    },
    {
      title: "Payment Gateway",
      content: tx.gateway,
    },
    {
      title: "Description",
      content: tx.description,
    },
    {
      title: "Reference",
      content: tx.reference,
    },
    {
      title: "Date",
      content: `${tx.created_at.split(" ")[0]} • ${
        tx.created_at.split(" ")[1]
      }`,
    },
  ]
}
