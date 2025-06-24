"use client";

export default function PaymentPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen p-8 flex flex-col bg-[#f9f6f3] font-sans">
      <button
        onClick={() => history.back()}
        className="mb-8 px-4 py-2 rounded-full bg-[#d7ccc8] text-[#3e2723] font-semibold hover:bg-[#c2b3ae] w-24 shadow-sm transition-colors select-none"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-12 text-[#3e2723] text-center tracking-wide">
        Select Payment Method
      </h1>

      <div className="flex flex-col gap-8">
        <button
          onClick={() => alert("You chose Cash")}
          className="py-5 bg-white rounded-3xl shadow-md font-semibold text-[#3e2723] hover:bg-[#efebe9] transition-colors select-none"
        >
          Cash
        </button>
        <button
          onClick={() => alert("You chose UPI")}
          className="py-5 bg-white rounded-3xl shadow-md font-semibold text-[#3e2723] hover:bg-[#efebe9] transition-colors select-none"
        >
          UPI
        </button>
      </div>
    </div>
  );
}
