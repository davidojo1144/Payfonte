import { fireEvent, render } from '@testing-library/react-native';

import { StateView } from '@/components/common/StateView';

describe('StateView', () => {
  it('renders loading state content', () => {
    const { getByText } = render(
      <StateView
        type="loading"
        title="Loading countries"
        description="Please wait"
      />
    );

    expect(getByText('Loading countries')).toBeTruthy();
    expect(getByText('Please wait')).toBeTruthy();
  });

  it('renders error action and triggers callback', () => {
    const onActionPress = jest.fn();
    const { getByText } = render(
      <StateView
        type="error"
        title="Failed"
        description="Try again"
        actionLabel="Retry"
        onActionPress={onActionPress}
      />
    );

    fireEvent.press(getByText('Retry'));
    expect(onActionPress).toHaveBeenCalledTimes(1);
  });
});
