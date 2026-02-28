export default function Metric({ title, value }: { title: string; value: string | number }) {
    return (
        <div>
            <p className="text-secondary text-sm">{title}</p>
            <p className="metric text-3xl font-semibold text-primary">{value}</p>
        </div>
    );
}
