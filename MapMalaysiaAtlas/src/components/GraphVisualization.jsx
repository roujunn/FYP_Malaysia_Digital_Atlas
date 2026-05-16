import React, { useMemo, useState } from "react";
import { CircleDot, Eye, GitBranch } from "lucide-react";

function buildGraph(edges) {
  const nodes = [];
  const nodeMap = new Map();

  edges.forEach(([source, relation, target]) => {
    [source, target].forEach((name) => {
      if (!nodeMap.has(name)) {
        const node = { id: name, label: name };
        nodeMap.set(name, node);
        nodes.push(node);
      }
    });
  });

  const fixedPositions = {
    Malaysia: { x: 50, y: 10 },

    Pahang: { x: 50, y: 24 },

    "Kuantan District": { x: 22, y: 42 },
    "Pekan District": { x: 42, y: 42 },
    "Jerantut District": { x: 62, y: 42 },
    "Lipis District": { x: 82, y: 42 },

    "Sungai Pahang": { x: 30, y: 66 },
    "Sungai Jelai": { x: 50, y: 66 },
    "Sungai Tembeling": { x: 70, y: 66 },

    Kuantan: { x: 35, y: 86 },
    "Taman Gelora": { x: 55, y: 86 },
    "Main Street": { x: 75, y: 86 },
  };

  const positionedNodes = nodes.map((node, index) => {
    if (fixedPositions[node.id]) {
      return { ...node, ...fixedPositions[node.id] };
    }

    return {
      ...node,
      x: 15 + (index % 5) * 18,
      y: 90,
    };
  });

  const positionedNodeMap = new Map(
    positionedNodes.map((node) => [node.id, node]),
  );

  const links = edges.map(([source, relation, target], index) => ({
    id: `${source}-${relation}-${target}-${index}`,
    source: positionedNodeMap.get(source),
    target: positionedNodeMap.get(target),
    relation,
  }));

  return { nodes: positionedNodes, links };
}

function GraphSvg({ nodes, links, selectedNode, setSelectedNode }) {
  const relatedLinks = selectedNode
    ? links.filter(
        (link) =>
          link.source.id === selectedNode.id ||
          link.target.id === selectedNode.id,
      )
    : links;

  return (
    <svg viewBox="0 0 100 100" role="img">
      <defs>
        <marker
          id="kg-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M 0 0 L 8 4 L 0 8 z" className="kg-arrow" />
        </marker>
      </defs>
      {links.map((link) => {
        const isDimmed =
          selectedNode &&
          link.source.id !== selectedNode.id &&
          link.target.id !== selectedNode.id;
        return (
          <g key={link.id} className={isDimmed ? "kg-dimmed" : ""}>
            <line
              x1={link.source.x}
              y1={link.source.y}
              x2={link.target.x}
              y2={link.target.y}
              className="kg-link"
              markerEnd="url(#kg-arrow)"
            />
          </g>
        );
      })}
      {nodes.map((node) => {
        const isSelected = selectedNode?.id === node.id;
        const isDimmed =
          selectedNode &&
          !relatedLinks.some(
            (link) => link.source.id === node.id || link.target.id === node.id,
          ) &&
          !isSelected;
        return (
          <g
            key={node.id}
            className={`kg-node-group ${isSelected ? "selected" : ""} ${isDimmed ? "kg-dimmed" : ""}`}
            onClick={() => setSelectedNode(isSelected ? null : node)}
          >
            <circle cx={node.x} cy={node.y} r="7" className="kg-node" />
            <text x={node.x} y={node.y + 13} className="kg-node-label">
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function GraphVisualization({ graph, compact = false }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [showFullGraph, setShowFullGraph] = useState(false);
  const { nodes, links } = useMemo(() => buildGraph(graph || []), [graph]);

  const relatedLinks = selectedNode
    ? links.filter(
        (link) =>
          link.source.id === selectedNode.id ||
          link.target.id === selectedNode.id,
      )
    : links;

  if (compact) {
    return (
      <div className="kg-mini-summary-card">
        <div className="kg-mini-stats">
          <div>
            <span>Nodes</span>
            <strong>{nodes.length}</strong>
          </div>
          <div>
            <span>Relationships</span>
            <strong>{links.length}</strong>
          </div>
        </div>

        {showFullGraph && (
          <div
            className="modal-backdrop"
            onClick={() => setShowFullGraph(false)}
          >
            <div
              className="graph-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <h3>Full Knowledge Graph View</h3>
                  <p>
                    {nodes.length} nodes · {links.length} relationships
                  </p>
                </div>
              </div>
              <GraphVisualization graph={graph} compact={false} />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="kg-visual-card">
      <div className="kg-visual-header">
        <div>
          <span className="section-kicker">
            <GitBranch size={14} /> Graph visualization
          </span>
          <h3>Knowledge graph relationships</h3>
        </div>
        <span className="kg-count-pill">
          {nodes.length} nodes · {links.length} links
        </span>
      </div>
      <div className="kg-visual-body">
        <div className="kg-canvas" aria-label="Knowledge graph visualization">
          <GraphSvg
            nodes={nodes}
            links={links}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          />
        </div>
        <div className="kg-side-panel">
          <div className="kg-side-title">
            <Eye size={15} />
            {selectedNode ? selectedNode.label : "All relationships"}
          </div>
          <div className="kg-side-list">
            {relatedLinks.map((link) => (
              <div className="kg-side-edge" key={`side-${link.id}`}>
                <b>{link.source.label}</b>
                <span>{link.relation}</span>
                <b>{link.target.label}</b>
              </div>
            ))}
          </div>
          <p className="kg-help-text">
            Click a node to focus its direct relationships. This is a frontend
            of the future Neo4j/Cytoscape graph view.
          </p>
        </div>
      </div>
    </div>
  );
}

export default GraphVisualization;
