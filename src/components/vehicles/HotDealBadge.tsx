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
        >
            {label}
        </span>
    );
}