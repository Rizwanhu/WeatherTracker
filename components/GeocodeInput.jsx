'use client';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import styles from '../public/styles/GeocodeInput.module.scss';

const GeocodeInput = ({ address, coordinates, setAddress, setCoordinates }) => {
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    setAddress(value);
    setCoordinates(latLng);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className={styles.container}>
          <input
            className={styles.input}
            {...getInputProps({ placeholder: 'Type address' })}
          />

          {loading && <div className={styles.loading}>Loading...</div>}

          <div className={styles.suggestions}>
            {suggestions.map(suggestion => {
              const style = {
                backgroundColor: suggestion.active
                  ? 'rgb(103, 161, 37)'
                  : 'rgb(178, 222, 129)',
              };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, { style })}
                  key={suggestion.id}
                >
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default GeocodeInput;
