export default function NewPatientPage() {
  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-slate-800">
        Register New Patient
      </h1>

      <p className="text-gray-500 mt-2">
        Complete the patient's information below.
      </p>

      <form className="mt-8 bg-white rounded-xl shadow p-8 space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block font-medium mb-2">
              First Name
            </label>

            <input
              type="text"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Last Name
            </label>

            <input
              type="text"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Phone Number
            </label>

            <input
              type="text"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Gender
            </label>

            <select className="w-full border rounded-lg p-3">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

        </div>

        <button
          className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800"
        >
          Save Patient
        </button>

      </form>
    </main>
  );
}