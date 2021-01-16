
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export function DropDownBig({ 
    placeholder, 
    items, 
    onChangeItem 
}) {
    return (
        <DropDownPicker
            style={{borderRadius: 8}}
            placeholder={placeholder}
            labelStyle={{fontSize: 24, color: 'black', padding: 10}}
            items={items}
            itemStyle={{justifyContent: 'flex-start'}}
            dropDownMaxHeight={375}
            dropDownStyle={{backgroundColor: '#f8f8ff'}}
            containerStyle={{
                height: 100, 
                width: 360, 
                shadowColor: 'black',
                shadowOpacity: 0.4,
                shadowOffset: {width: 1, height: 1}
            }}
            onChangeItem={onChangeItem}
        />
    )
}

export function DropDownMedium ({ 
    placeholder, 
    items, 
    defaultValue, 
    onChangeItem 
}) {
    return (
        <DropDownPicker
            placeholder={placeholder}
            labelStyle={{fontSize: 16, color: 'black', padding: 10}}
            items={items}
            defaultValue={defaultValue}
            dropDownMaxHeight={172}
            dropDownStyle={{backgroundColor: '#f8f8ff'}}
            containerStyle={{
                height: 80, 
                width: 115, 
                margin: 2.5, 
                shadowColor: 'black',
                shadowOpacity: 0.2,
                shadowOffset: {width: 1, height: 1}
            }}
            onChangeItem={onChangeItem}
        />
    )
}

export function DropDownTiny({ 
    placeholder, 
    items, 
    defaultValue, 
    onChangeItem 
}) {   
    return (
        <DropDownPicker
            placeholder={placeholder}
            labelStyle={{fontSize: 16, color: 'black', padding: 10}}
            items={items}
            defaultValue={defaultValue}
            dropDownStyle={{backgroundColor: '#f8f8ff'}}
            containerStyle={{
                height: 80, 
                width: 90,
                margin: 5, 
                shadowColor: 'black',
                shadowOpacity: 0.2,
                shadowOffset: {width: 1, height: 1}
            }}
            onChangeItem={onChangeItem}
        />
    )
}

export function DropDownCases({ 
    placeholder, 
    items, 
    defaultValue, 
    onChangeItem 
}) {   
    return (
        <DropDownPicker
            placeholder="Select a Case"
            labelStyle={{fontSize: 16, color: 'black', padding: 10}}
            items={renderCases()}
            defaultIndex={0}
            itemStyle={{justifyContent: 'flex-start'}}
            dropDownStyle={{backgroundColor: '#f8f8ff'}}
            containerStyle={{
                height: 60, 
                width: 200, 
                shadowColor: 'black',
                shadowOpacity: 0.2,
                marginBottom: 100, 
                marginTop: 40,
                shadowOffset: {width: 1, height: 1}
            }}
            onChangeItem={(item) => setSelectedCase({
                id: item.value.id, 
                name: item.value.name,
                dob: item.value.dob
            })}
        />
    )
}

