export default function UnauthorizedPage() {
    return (
        <main className="min-h-screen bg-gray-50 flex items-start justify-center">
            <div className="bg-white w-[50%] p-8 mt-24 rounded-2xl shadow-xl border-t-4 border-red-600 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Unauthorized</h2>
                <p className="text-gray-600">You do not have permission to access this page.</p>
            </div>
        </main>
    );
}