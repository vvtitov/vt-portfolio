interface CaseResultCardProps {
  amount: string
}

export function CaseResultCard({ amount }: CaseResultCardProps) {
  return (
    <div className="bg-blue-900 text-white p-6 rounded-lg shadow-md">
      <div className="text-2xl font-bold">{amount}</div>
    </div>
  )
}

