import { NextResponse } from 'next/server';

// Define your treeNodes array here
const treeNodes = [
  {
    dataElementId: 1,
    name: 'Node1',
    externalId: '7657',
    groupId: null,
    Groups: [],
    dataPartitions: {},
    dataPartitionId: '45353',
    dataPartition: null,
    dataElementAttributes: [],
    showAttributes: true,
  },
  {
    dataElementId: 2,
    name: 'Branch1-1',
    externalId: '7658',
    groupId: '1',
    Groups: [],
    dataPartitions: {},
    dataPartitionId: '45354',
    dataPartition: null,
    dataElementAttributes: [],
    showAttributes: false,
  },
  // More nodes follow...
];

// GET handler for API route
export async function GET() {
  // Return the treeNodes array as a JSON response
  return NextResponse.json(treeNodes);
}
