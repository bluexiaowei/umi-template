import React, { useRef, useState } from 'react';

const Ellipse: React.FC<{ text: string }> = function (props) {
  const { text, ...other } = props;
  const ref = useRef<HTMLSpanElement>(null);
  const [txt, setText] = useState<string>(text || '');

  React.useEffect(() => {
    if (ref.current === null) return;

    const { current } = ref;
    const parentWidth = current.parentElement?.offsetWidth || 0;
    const width = current.offsetWidth;

    if (width > parentWidth) {
      const middleNum = Math.floor(txt.length / 2 - 1.5);

      setText(`${txt.slice(0, middleNum - 3)}...${txt.slice(-middleNum - 2)}`);
    }
  }, [txt, ref.current === null]);

  return (
    <div {...other}>
      <span ref={ref} style={{ whiteSpace: 'nowrap' }}>
        {txt}
      </span>
    </div>
  );
};

export default Ellipse;
