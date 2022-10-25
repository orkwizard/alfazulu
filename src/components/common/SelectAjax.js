import { useState } from 'react';
import AsyncSelect from 'react-select/async';

export default function SelectAjax({
    loadOptions: cb,
    value, 
    token, 
    url, 
    className, 
    defaultOptions, 
    onChange,
    params
}){
    const [, setSugestion] = useState([]);
    const filterData = (inputValue, temp) => {
        return temp.filter(i =>
          i.label.toLowerCase().includes(inputValue.toLowerCase()),
        );
    };

    const loadOptions = (inputValue, callback) => {
        if (!inputValue?.length || inputValue.length < 3) {
          callback([]);
        } else if (cb) {
          cb(inputValue, callback);
        } else if (!url?.length) {
          callback([]);
        } else {
          const allParams = { ...(params || {}) } || {};
          if (!allParams.inputValue) allParams.inputValue = inputValue;
    
          const urlWithParams = Object.keys(allParams).reduce(
            (acc, key) => acc.replace(`{${key}}`, allParams[key]),
            url,
          );
    
          fetch(urlWithParams, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
          })
          .then(response => response.json())
          .then(finalResponse => {
                const data = finalResponse.map(({ id, name, state }) => ({
                    value: id,
                    label: `${name}${state ? `, ${state.name}` : ''}${state?.country ? `, ${state?.country.name}` : ''}`,
                }));
                callback(filterData(inputValue, data));
                setSugestion(finalResponse);
          })
          .catch(error => {
            callback([]);
          })
        }
    };


    return (
        <AsyncSelect 
            cacheOptions 
            loadOptions={loadOptions} 
            defaultOptions
            className={className}
            onChange={onChange}
            value={value}
            openMenuOnClick={false}
            placeholder={`Escribe al menos 3 letras`}
        />
    )
}