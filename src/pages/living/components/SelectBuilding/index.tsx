import React, { useEffect, useState } from 'react';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { Divider } from 'antd';
import { queryTree } from '../../service';
import { LivingFetchParams } from '../../data';

interface Props {
  onSubmit: (params: LivingFetchParams) => void;
  params: LivingFetchParams;
}

const SelectBuilding = (props: Props) => {
  const [roomTree, setRoomTree] = useState({});
  const [areas, setAreas] = useState<Array<any>>([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [buildings, setBuildings] = useState<Array<any>>([]);
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [units, setUnits] = useState<Array<any>>([]);
  const [selectedUnit, setSelectedUnit] = useState('');

  const { onSubmit, params } = props

  useEffect(() => {
    if (!params.area) {
      setBuildings([])
      setUnits([])
    }
    setSelectedArea(params?.area || '');
    setSelectedBuilding(params?.building || '');
    setSelectedUnit(params?.unit || '');
  }, [params])

  const fetchTree = async () => {
    // setLoading(true);
    const res = await queryTree();
    const tree = res.data
    // setLoading(false);
    setRoomTree(tree);
    const allAreas = Object.keys(tree)
    setAreas(allAreas)
    if (allAreas.length === 1) {
      setSelectedArea(allAreas[0])
      setBuildings(Object.keys(tree[allAreas[0]]))
    }
  }

  useEffect(() => {
    fetchTree()
  }, [])

  const handleAreaChange = (area: string, checked: boolean) => {
    if (checked) {
      setSelectedArea(area);
      setSelectedBuilding('');
      setSelectedUnit('');
      setBuildings(checked ? Object.keys(roomTree[area]) : [])
      setUnits([]);
    }
  }

  const handleBuildingChange = (building: string, checked: boolean) => {
    if (checked) {
      setSelectedBuilding(checked ? building : '');
      setSelectedUnit('');
      setUnits(checked ? roomTree[selectedArea][building] : [])
    }
  }

  const handleUnitChange = (unit: string, checked: boolean) => {
    if (checked) {
      onSubmit({ area: selectedArea, building: selectedBuilding, unit })
    }
  }

  return (
    <>
      <div>
        <span style={{ marginRight: 8, display: 'inline' }}>区域：</span>
        {areas.map((area: string) =>
          <CheckableTag
            key={`area-${area}`}
            style={{ fontSize: 14 }}
            checked={selectedArea === area}
            onChange={checked => handleAreaChange(area, checked)}
          >
            {area}
          </CheckableTag>
        )}
      </div>
      <Divider dashed style={{ margin: '6px 0' }} />
      <div>
        <span style={{ marginRight: 8, display: 'inline' }}>楼号：</span>
        {buildings.map(building =>
          <CheckableTag
            key={`building-${building}`}
            style={{ fontSize: 14 }}
            checked={selectedBuilding === building}
            onChange={checked => handleBuildingChange(building, checked)}
          >
            {building}
          </CheckableTag>
        )}
      </div>
      <Divider dashed style={{ margin: '6px 0' }} />
      <div style={{ display: 'flex' }}>
        <span style={{ marginRight: 8, display: 'inline' }}>单元：</span>
        <span style={{ marginLeft: 0, flex: 1 }}>
          {units.map(unit =>
            <CheckableTag
              key={`unit-${unit}`}
              style={{ fontSize: 14 }}
              checked={selectedUnit === unit}
              onChange={checked => handleUnitChange(unit, checked)}
            >
              {unit}
            </CheckableTag>
          )}
        </span>
      </div>
    </>
  )
}

export default SelectBuilding
