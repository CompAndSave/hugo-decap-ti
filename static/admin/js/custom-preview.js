const iframe =
  typeof document !== "undefined"
    ? document.getElementsByTagName("iframe")[0]
    : {};

const PostPreview = createClass({
  componentDidMount() {
    const { document } = this.props;
    const iconLink = document.createElement("link");
    iconLink.href =
      "https://www.tomatoink.com/static/frontend/Compandsave/ti/en_US/fonts/TI-Icons/TI-Icons.ttf";
    iconLink.rel = "preload";
    iconLink.as = "font";
    iconLink.crossOrigin = "anonymous";
    document.head.appendChild(iconLink);
    const font = document.createElement("link");
    font.href = "https://fonts.gstatic.com";
    font.rel = "preconnect";
    document.head.appendChild(font);
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Oleo+Script&family=Roboto+Slab:wght@300;800&display=swap";
    link.rel = "stylesheet";
    link.type = "text/css";
    document.head.appendChild(link);
  },
  render: function () {
    const entry = this.props.entry;
    const title = entry.getIn(["data", "title"]) ?? "";
    const author = entry.getIn(["data", "authors"]) ?? "";
    const date = entry.getIn(["data", "date"]) ?? "";
    const formattedDate = date ? new Date(date) : new Date();

    const separator =
      String.fromCharCode(0x00a0) +
      String.fromCharCode(0x00a0) +
      String.fromCharCode(0x00a0) +
      String.fromCharCode(0x007c) +
      String.fromCharCode(0x00a0) +
      String.fromCharCode(0x00a0) +
      String.fromCharCode(0x00a0);

    return h(
      "article",
      { className: "content margin-2" },
      h(
        "section",
        { className: "post-full-content" },
        h("h1", { className: "content-title" }, title),
        h(
          "div",
          { className: "post-detail" },
          h("span", { className: "cas-i-clock" }, '  '),
          h(
            "span",
            { className: "date" },
              formattedDate.toLocaleDateString("en-us", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }) +
              "   "
          ),
          h("span", { className: "author" }, h("span", { className: "cas-i-account" }, "  "), h("a", { href: "#" }, author)),
          h(
            "div",
            { className: "tags" },
            h("span", { className:"cas-i-coupon" }, "  "),
            h(
              "ul",
              { className: "tags-list" },
              this.props.widgetsFor("tags").map((tag, index) => {
                if (tag) {
                  return h(
                    "li",
                    { key: index },
                    h("a", { className: "tag" }, tag.getIn(["data"]))
                  );
                }
                return "";
              })
            )
          )
        ),
        h(
          "section",
          { className: "content-body" },
          this.props.widgetFor("body")
        )
      )
    );
  },
});

CMS.registerPreviewTemplate("posts", PostPreview);
CMS.registerPreviewTemplate("drafts", PostPreview);
CMS.registerPreviewStyle("/blog/css/ti-icons.min.css");
CMS.registerPreviewStyle("/blog/css/main.min.css");
CMS.registerPreviewStyle("/blog/css/page/article.min.css");
