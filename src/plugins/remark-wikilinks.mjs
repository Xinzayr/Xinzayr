export function remarkWikilinks() {
  return (tree) => {
    function traverse(node) {
      if (!node.children || !Array.isArray(node.children)) return;

      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];

        if (child.type === 'text' && child.value) {
          const wikiRegex = /\[\[([^\]\|]+)(?:\|([^\]]+))?\]\]/g;
          if (wikiRegex.test(child.value)) {
            wikiRegex.lastIndex = 0;
            const newChildren = [];
            let lastIndex = 0;
            let match;

            while ((match = wikiRegex.exec(child.value)) !== null) {
              const [fullMatch, slugRaw, labelRaw] = match;
              const matchIndex = match.index;

              if (matchIndex > lastIndex) {
                newChildren.push({
                  type: 'text',
                  value: child.value.slice(lastIndex, matchIndex),
                });
              }

              const slug = slugRaw.trim().toLowerCase().replace(/\s+/g, '-');
              const label = (labelRaw || slugRaw).trim();

              newChildren.push({
                type: 'link',
                url: `/blog/${slug}`,
                children: [{ type: 'text', value: label }],
                data: {
                  hProperties: {
                    class: 'wikilink text-blue-400 hover:text-blue-300 underline font-semibold transition-colors bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20 cursor-pointer',
                    'data-wikilink': slug,
                    'data-post-preview': slug,
                  },
                },
              });

              lastIndex = wikiRegex.lastIndex;
            }

            if (lastIndex < child.value.length) {
              newChildren.push({
                type: 'text',
                value: child.value.slice(lastIndex),
              });
            }

            node.children.splice(i, 1, ...newChildren);
            i += newChildren.length - 1;
          }
        } else {
          traverse(child);
        }
      }
    }

    traverse(tree);
  };
}
