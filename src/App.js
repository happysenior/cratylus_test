import { useEffect, useState } from "react";
import useWindowDimensions from "./components/useDimension";
import Child from "./components/ChildDiv";
import ColorModal from "./components/ColorModal";

import "./App.css";

const findNode = (data, id) => {
  let dataArray = [];
  dataArray.push(data);
  let depth = 0;
  while (dataArray?.length && depth < 20) {
    let node = dataArray.shift();
    if (node?.id === id) return node;
    if (node?.child?.length > 0) {
      node.child.map((item) => dataArray.push(item));
    }
  }
  return false;
};

const getJSON = (tree) => {
  let data = {};
  let depth = 0;
  data.id = tree.id;
  data.color = tree.backgroundColor;
  let dataArray = [];
  dataArray.push(data);
  let node = "";
  let curNode = "";
  while (depth < 20 && dataArray.length > 0) {
    let currentData = dataArray.shift();
    node = findNode(tree, currentData.id);
    curNode = findNode(data, currentData.id);
    if (node?.child?.length) {
      curNode.child = [
        { id: node.child[0].id, color: node.child[0].backgroundColor },
        { id: node.child[1].id, color: node.child[1].backgroundColor },
      ];
      dataArray.push(curNode.child[0]);
      dataArray.push(curNode.child[1]);
      depth++;
    }
  }
  return JSON.stringify(data);
};

function App() {
  const windowDimensions = useWindowDimensions();
  const [count, setCount] = useState(1);
  const [tree, setTree] = useState([
    {
      parent: -1,
      id: 0,
      width: windowDimensions.width,
      height: windowDimensions.height - 100,
      widthP: "100%",
      heightP: "100%",
      backgroundColor: "#efefef",
      child: [],
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [firstColor, setFirstColor] = useState("#ffffff");
  const [secondColor, setSecondColor] = useState("#ffffff");
  const [selectedId, setSelectedId] = useState(-1);

  const splitDivs = (id) => {
    let treeData = tree;
    let node = findNode(treeData[0], id);
    if (!node) {
      console.log("not found the node itme");
      setSelectedId(-1);
      return;
    }
    setSelectedId(id);
    setIsOpen(true);
  };

  const downloadJSON = (text, name) => {
    const a = document.createElement("a");
    const type = name.split(".").pop();
    a.href = URL.createObjectURL(
      new Blob([text], { type: `text/${type === "txt" ? "plain" : type}` })
    );
    a.download = name;
    a.click();
  };

  useEffect(() => {
    if (!isOpen) {
      let treeData = tree;
      let node = findNode(treeData[0], selectedId);
      if (!node) {
        console.log("not found the node itme");
        setSelectedId(-1);
        return;
      }
      const width = node.width > node.height ? node.width / 2 : node.width;
      const widthP = node.width > node.height ? "50%" : "100%";
      const height = node.width > node.height ? node.height : node.height / 2;
      const heightP = node.width > node.height ? "100%" : "50%";
      node.child = [
        {
          parent: selectedId,
          id: count,
          width: width,
          height: height,
          widthP: widthP,
          heightP: heightP,
          backgroundColor: firstColor,
          child: [],
        },
        {
          parent: selectedId,
          id: count + 1,
          width: width,
          height: height,
          widthP: widthP,
          heightP: heightP,
          backgroundColor: secondColor,
          child: [],
        },
      ];
      setSelectedId(-1);
      setTree(treeData);
      setCount((prev) => prev + 2);
    }
  }, [isOpen, firstColor, secondColor, tree, count]);

  return (
    <div className="app">
      <Child {...tree[0]} splitDivs={splitDivs} />
      <div className="button-group">
        <button className="button" onClick={(e) => downloadJSON(getJSON(tree[0]),'data.json')}>
          Display JSON
        </button>
      </div>
      <ColorModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setFirstColor={setFirstColor}
        setSecondColor={setSecondColor}
        firstColor={firstColor}
        secondColor={secondColor}
      />
    </div>
  );
}

export default App;
