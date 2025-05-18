// src/components/PDAVisualizer.tsx

import React, { useMemo } from 'react';
import ReactFlow, {
Background,
MiniMap,
Controls,
Node,
Edge
} from 'react-flow';
import type { PDA } from '../logic/pda.types';

type PDAVisualizerProps = {
pda: PDA; // The final PDA object from the form
};

/**

Transform the PDA data into a set of nodes and edges

that React Flow can render.
*/
function pdaToReactFlow(pda: PDA): { nodes: Node[]; edges: Edge[] } {
// 1. Create React Flow nodes from each state
const nodes: Node[] = pda.states.map((state, index) => {
const isStart = (state === pda.startState);
const isAccept = pda.acceptStates.includes(state);

return {
id: state, // Each node's unique ID
position: { x: 100 * index, y: 100 * index }, // Basic spacing
data: {
label: ${state}${isStart ? ' (start)' : ''}${isAccept ? ' (accept)' : ''}
},
style: {
// Make start states green, accept states slightly highlighted, etc.
border: isStart ? '3px solid green' : '1px solid #666',
background: isAccept ? '#e6ffed' : '#fff',
borderRadius: '4px',
padding: '8px'
}
};
});

// 2. Create React Flow edges from each transition
const edges: Edge[] = pda.transitions.map((t, idx) => {
// Label includes input, pop, and push symbols
const label = [${t.input}, ${t.pop} → ${t.push.join('')}];


return {
  id: `edge-${idx}`,
  source: t.from,
  target: t.to,
  label: label,
  markerEnd: { type: 'arrowclosed' },  // Draws an arrow at the end
  style: { stroke: '#333' },
  labelStyle: { fill: '#222', fontSize: 12 }
};
});

return { nodes, edges };
}

const PDAVisualizer: React.FC = ({ pda }) => {
// Memoize nodes & edges so we only recalc when the pda object changes
const { nodes, edges } = useMemo(() => pdaToReactFlow(pda), [pda]);

return (
<div style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}>

{/* Optional UI add-ons for background, minimap, zoom/pan controls */}





);
};

