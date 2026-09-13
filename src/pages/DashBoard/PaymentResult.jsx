import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { AuthContext } from "../../context/authContext";
import apiClient from "../../services/ApiClient";
import Spinner from "../../components/Utilities/Spinner";

const copy = {
  success: {
    title: "Payment successful",
    body: "Your job is now featured and will appear at the top of listings.",
    tone: "text-green-700",
  },
  fail: {
    title: "Payment failed",
    body: "SSLCommerz could not complete this payment. You can try again from Posted Jobs.",
    tone: "text-rose-700",
  },
  cancel: {
    title: "Payment cancelled",
    body: "No charge was made. You can feature the job whenever you are ready.",
    tone: "text-slate-700",
  },
};

const PaymentResult = ({ kind }) => {
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(kind === "success");
  const tranId = searchParams.get("tran_id");
  const text = copy[kind] || copy.fail;

  useEffect(() => {
    const verify = async () => {
      if (kind !== "success" || !tranId || !user?.id) {
        setLoading(false);
        return;
      }
      try {
        const res = await apiClient.get(`payments/verify/?tran_id=${tranId}`);
        setPayment(res.data);
      } catch {
        setPayment(null);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [kind, tranId, user?.id]);

  if (loading) return <Spinner title="Confirming payment..." />;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md">
      <h1 className={`mb-3 text-2xl font-bold ${text.tone}`}>{text.title}</h1>
      <p className="mb-4 text-gray-600">{text.body}</p>
      {tranId && (
        <p className="mb-6 font-mono text-sm text-slate-500">
          Transaction: {tranId}
          {payment?.status ? ` · ${payment.status}` : ""}
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        <Link
          to="/dashboard/payments"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          View payment history
        </Link>
        <Link
          to="/dashboard/posted-jobs"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to posted jobs
        </Link>
      </div>
    </div>
  );
};

export default PaymentResult;
