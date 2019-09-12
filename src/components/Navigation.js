import React from 'react';

const Navigation = props => (
  <div className="navigation">
    <button
      id="Yminus"
      className="dirButton fa fa-arrow-circle-left"
      onClick={props.handleTravel}
    />
    <button
      id="Xminus"
      className="dirButton fa fa-arrow-circle-up"
      onClick={props.handleTravel}
    />
    <button
      id="Xplus"
      className="dirButton fa fa-arrow-circle-down"
      onClick={props.handleTravel}
    />
    <button
      id="Yplus"
      className="dirButton fa fa-arrow-circle-right"
      onClick={props.handleTravel}
    />
  </div>
);

export default Navigation;
