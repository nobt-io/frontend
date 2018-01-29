import React from "react";

export default function withDelayable(delayActionId) {
  return function (WrappedComponent) {

    class Delayable extends React.Component {

      state = {
        [ delayActionId ]: {
          timeoutHandle: -1,
          remainingTime: 0
        }
      };

      constructor(props) {
        super(props);
      }

      cancel = () => {
        clearTimeout(this.state[ delayActionId ].timeoutHandle);
        this.setState({
          [ delayActionId ]: {
            timeoutHandle: -1,
            remainingTime: 0
          }
        });
      };

      schedule = (action, delay) => {

        const onTimeoutReached = () => {
          action();
          this.setState({
            [ delayActionId ]: {
              timeoutHandle: -1,
              remainingTime: 0
            }
          });
        };

        const timeoutHandle = setTimeout(onTimeoutReached, delay);

        this.setState({
          [ delayActionId ]: {
            timeoutHandle: timeoutHandle,
            remainingTime: delay
          }
        });

        const decrement = 1000;

        const decrementTimeout = () => {

          if (this.state[ delayActionId ].remainingTime > 0 && this.state[ delayActionId ].timeoutHandle !== -1) {
            this.setState({
              [ delayActionId ]: {
                timeoutHandle: timeoutHandle,
                remainingTime: this.state[ delayActionId ].remainingTime - decrement
              }
            });

            setTimeout(decrementTimeout, decrement)
          }

        };

        setTimeout(decrementTimeout, decrement)
      };

      remainingTime = () => {
        return this.state[ delayActionId ].remainingTime;
      };

      isRunning = () => {
        return this.state[ delayActionId ].timeoutHandle !== -1;
      };

      delayableProps = () => {
        return {
          [delayActionId]: {
            schedule: this.schedule,
            cancel: this.cancel,
            remainingTime: this.remainingTime(),
            isRunning: this.isRunning()
          }
        }
      };

      render() {
        return (
          <WrappedComponent
            {...this.props}
            {...this.delayableProps()}
          />
        )
      }
    }

    return Delayable
  }

}
