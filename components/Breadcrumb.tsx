interface BreadcrumbProps {
  items: Array<{ label: string; href?: string }>;
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="text-[11px] text-[#999999] ml-8 mt-6 mb-6">
      {items.map((item, index) => (
        <span key={index}>
          {item.href ? (
            <a href={item.href} className="hover:text-[#4c8fa3]">
              {item.label}
            </a>
          ) : (
            item.label
          )}
          {index < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </div>
  );
}
