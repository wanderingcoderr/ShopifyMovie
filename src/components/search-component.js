import { TextField, Icon, Button, Layout} from '@shopify/polaris';
import { useState, useCallback} from 'react';
import {
    SearchMajor
  } from '@shopify/polaris-icons';

const SearchComponent = (props) => {
    const [textFieldValue, setTextFieldValue] = useState('');
  
    const handleTextFieldChange = useCallback(
      (value) => setTextFieldValue(value),
      [],
    );

    const icon = <Icon
    source={SearchMajor}
    
    color="base" />;
  
    return (
        <div className="searchComponent">
            <Layout>
                <Layout.Section>
      <TextField
        type="text"
        value={textFieldValue}
        onChange={handleTextFieldChange}
        prefix={icon}
        helpText="Enter atleast 3 characters and click search"
      />

                </Layout.Section>
                <Layout.Section secondary>
      <Button disabled={textFieldValue.length < 3 ? true: false} onClick={() => props.search(textFieldValue,1)}>Search</Button>

                </Layout.Section>
            </Layout>
      </div>
    );
  }

  export default SearchComponent;