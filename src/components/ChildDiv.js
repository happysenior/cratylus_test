import classNames from "classnames";

export default function Child({ id, width, height, backgroundColor, child, splitDivs }) {
    
  return child?.length === 0 ? (
    <div
      className={classNames({ row: width >= height, col: width < height })}
      style={{ width, height, backgroundColor }}
      onClick={(e) => splitDivs(id)}
      key={id}
    >
      {child?.length > 0 &&
        child.map((item) => 
          <Child key={item.id} {...item} splitDivs={splitDivs} />
        )}
    </div>
  ) : (
    <div
      className={classNames({ row: width >= height, col: width < height })}
      style={{ width, height, backgroundColor }}
      key={id}
    >
      {child?.length > 0 &&
        child.map((item) => 
          <Child key={item.id} {...item} splitDivs={splitDivs} />
        )}
    </div>
  );
}
