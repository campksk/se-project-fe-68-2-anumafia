export default function DataPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-24">
      <div className="max-w-5xl mx-auto space-y-5">

        {/* Rules Panel */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">
              Rules <span className="font-normal text-gray-400">— User Responsibilities</span>
            </h2>
          </div>

          <div className="px-6 py-5 space-y-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-cyan-600 mb-2">Account &amp; Access</p>
              {[
                { title: "Accurate information:", body: "Users must provide truthful and up-to-date personal details when registering or updating their profile." },
                { title: "Account sharing:", body: "Users must not share accounts." },
                { title: "Unauthorized access:", body: "Attempting to access other user's accounts is strictly prohibited." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <strong className="font-medium text-gray-800">{item.title}</strong> {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-cyan-600 mb-2">Acceptable Use</p>
              {[
                { title: "No misuse:", body: "Data accessed through our platform may not be used for spam, phishing, or any unlawful purpose." },
                { title: "Respect for others:", body: "Users must not upload, share, or transmit content that violates third-party privacy rights." },
                { title: "Compliance:", body: "All users must comply with applicable local, national, and international laws regarding data use." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <strong className="font-medium text-gray-800">{item.title}</strong> {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-cyan-600 mb-2">What will happen if you break the rules?</p>
              <div className="flex items-start gap-3 py-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="font-medium text-gray-800">Consequences:</strong> Minor violations like spam or inappropriate language will result in a yellow card/warning — 3 of them will lead to a suspension or ban. Major violations will result in an immediate suspension or ban, or legal action as permitted by applicable law.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Policy Panel */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">
              Data Policy <span className="font-normal text-gray-400">— How We Handle Your Data</span>
            </h2>
          </div>

          <div className="px-6 py-5 space-y-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-cyan-600 mb-2">Data We Collect</p>
              {[
                { label: "Personal data", value: "Name, email address, phone number." },
              ].map((item, i) => (
                <div key={i} className="py-2.5 border-b border-gray-50 last:border-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">{item.label}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-cyan-600 mb-2">How We Use Your Data</p>
              <div className="py-2.5 border-b border-gray-50">
                <p className="text-sm text-gray-600 leading-relaxed">
                   Data is shared only with the company you book an interview with and the site administrators for content moderation, and is never sold to any third parties. 
                </p>
              </div>
              <div className="py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">Data Deletion</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  ALL of user's data is deleted immediately after account closure.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}