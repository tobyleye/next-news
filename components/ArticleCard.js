import dayjs from "dayjs";
export default function ArticleCard({
  title,
  description,
  url,
  urlToImage,
  publishedAt,
}) {
  return (
    <article>
      <img
        src={urlToImage}
        alt={title}
        height={200}
        width={200}
        style={{ objectFit: "cover" }}
      />
      <h3>{title}</h3>
      <time>{dayjs(publishedAt).format("DD/MM/YYYY hh:mm a")}</time>
      <p>
        {description}{" "}
        <a target="_blank" href={url}>
          Read more
        </a>
      </p>
      <style jsx>{`
        a {
          text-decoration: underline;
          color: var(--link-color);
        }
      `}</style>
    </article>
  );
}
