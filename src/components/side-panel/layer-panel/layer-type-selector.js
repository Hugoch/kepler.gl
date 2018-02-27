import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styled from 'styled-components';
import * as KeplerGlLayers from 'keplergl-layers';
import {classList} from 'components/common/item-selector/dropdown-list';

import ItemSelector from 'components/common/item-selector/item-selector';
import {LAYER_CLASSES} from 'constants/default-settings';

import {
  PanelLabel,
  SidePanelSection
} from 'components/common/styled-components';

function getLayerTypeOptions(layerClasses) {
  return Object.keys(layerClasses).map(key => {
    const layer = new KeplerGlLayers[layerClasses[key]]();
    return {
      id: key,
      label: layer.name,
      icon: layer.layerIcon
    };
  });
}

const TypeOptions = getLayerTypeOptions(LAYER_CLASSES);

const StyledDropdownListItem = styled.div`
  padding-bottom: 12px;
  padding-right: 12px;

  &.selected {
    .layer-type-selector__item__icon {
      border: 1px solid #caf2f4;
    }
  }

  :hover,
  &.selected {
    cursor: pointer;
    .layer-type-selector__item__icon {
      color: ${props => props.theme.activeColor};
    }

    .layer-type-selector__item__label {
      color: ${props => props.theme.textColor};
    }
  }
`;

const StyledListItem = styled.div`
  &.list {
    display: flex;
    align-items: center;
    
    .layer-type-selector__item__icon {
      color: ${props => props.theme.activeColor};
    }
  
    svg {
      margin-right: 12px;
    }
  }
  
  .layer-type-selector__item__icon {
    color: ${props => props.theme.labelColor};
    display: flex;
  }

  .layer-type-selector__item__label {
    text-transform: capitalize;
    font-size: 12px;
    text-align: center;
    color: ${props => props.theme.labelColor};
  }
`;

const DropdownListWrapper = styled.div`
  ${props => props.theme.dropdownList};
  background-color: ${props => props.theme.dropdownListBgd};
  border-top: 1px solid ${props => props.theme.dropdownListBorderTop};
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 12px 0 0 12px;
`;

const LayerTypeListItem = ({value, isTile}) => (
  <StyledListItem
    className={classNames('layer-type-selector__item__inner', {list: !isTile})}
  >
    <div className="layer-type-selector__item__icon">
      <value.icon
        height={isTile ? '64px' : '28px'}
        style={{backgroundColor: '#151E29'}}
      />
    </div>
    <div className="layer-type-selector__item__label">{value.label}</div>
  </StyledListItem>
);

const LayerTypeDropdownList = props => (
  <DropdownListWrapper className={classList.list}>
    {props.options.map((value, i) => (
      <StyledDropdownListItem
        className={classNames('layer-type-selector__item', {
          selected: props.selectedItems.find(it => it.id === value.id),
          hover: props.selectionIndex === i
        })}
        key={`${value.id}_${i}`}
        onMouseDown={e => {
          e.preventDefault();
          props.onOptionSelected(value, e);
        }}
        onClick={e => {
          e.preventDefault();
          props.onOptionSelected(value, e);
        }}
      >
        <props.customListItemComponent value={value} isTile />
      </StyledDropdownListItem>
    ))}
  </DropdownListWrapper>
);

const propTypes = {
  layer: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

const LayerTypeSelector = ({layer, onSelect}) => (
  <SidePanelSection>
    <div className="layer-config__type">
      <PanelLabel>Layer type</PanelLabel>
      <ItemSelector
        selectedItems={TypeOptions.find(op => op.id === layer.type)}
        options={TypeOptions}
        multiSelect={false}
        placeholder="Select A Type"
        onChange={onSelect}
        getOptionValue={op => op.id}
        filterOption="label"
        displayOption={op => op.label}
        DropDownLineItemRenderComponent={LayerTypeListItem}
        DropDownRenderComponent={LayerTypeDropdownList}
      />
    </div>
  </SidePanelSection>
);

LayerTypeSelector.propTypes = propTypes;

export default LayerTypeSelector;