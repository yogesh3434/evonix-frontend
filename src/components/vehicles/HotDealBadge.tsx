interface HotDealBadgeProps {
    label?: string;
}

export default function HotDealBadge({
    label = 'Hot Deal',
}: HotDealBadgeProps) {
    return (
        <span
            role="status"
            aria-label={label}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm"
        >
            {label}
        </span>
    );
}