import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import apiClient from "../../services/ApiClient";
import Spinner from "../../components/Utilities/Spinner";
import Pagination from "../../components/Utilities/Pagination";
import useServerPagination, {
  countFrom,
} from "../../hooks/useServerPagination";
import { formatDate } from "../../components/Utilities/UtilityFunctions";

const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-800",
  success: "bg-green-100 text-green-800",
  failed: "bg-rose-100 text-rose-800",
  cancelled: "bg-slate-100 text-slate-700",
};

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { currentPage, totalPage, applyPageData, handlePageChange } =
    useServerPagination();

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const res = await apiClient.get(
          `employers/${user.id}/payments/?page=${currentPage}`
        );
        setPayments(applyPageData(res.data));
        setTotalCount(countFrom(res.data));
      } catch {
        toast.error("Could not load payment history.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.id, currentPage, applyPageData]);

  if (loading) return <Spinner title="Loading payments..." />;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <h1 className="mb-2 text-2xl font-bold text-gray-800">Payments</h1>
      <p className="mb-6 text-sm text-gray-500">
        Featured job purchases made with SSLCommerz sandbox.
      </p>

      {totalCount === 0 ? (
        <p className="text-gray-500">
          No payments yet. Feature a job from{" "}
          <Link to="/dashboard/posted-jobs" className="text-blue-600 hover:underline">
            Posted Jobs
          </Link>
          .
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-slate-500">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Job</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Transaction</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="py-4 text-slate-600">
                      {formatDate(payment.created_at)}
                    </td>
                    <td className="py-4 font-medium text-gray-800">
                      {payment.job_title || `Job #${payment.job}`}
                    </td>
                    <td className="py-4 text-slate-600">
                      ৳{Number(payment.amount).toFixed(2)} {payment.currency}
                    </td>
                    <td className="py-4 font-mono text-xs text-slate-600">
                      {payment.tran_id}
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                          STATUS_STYLES[payment.status] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={handlePageChange}
            disabled={loading}
          />
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
