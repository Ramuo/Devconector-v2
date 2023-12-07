import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Réseau Social pour les Développeurs Web</h1>
          <p className="lead">
            Créez un profil/portfolio de développeur, partagez des publications et obtenez de l'aide d'
            autres développeurs
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
                S'inscrire
            </Link>
            <Link to="/login" className="btn btn-light">
                Connexion
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage