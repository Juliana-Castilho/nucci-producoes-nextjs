export const getGeolocation = async (): Promise<{
  latitude: number | null;
  longitude: number | null;
}> => {
  // Verifica o status da permissão com a API Permissions
  const permissionStatus = await navigator.permissions.query({
    name: 'geolocation',
  });

  const geolocationConsentido = localStorage.getItem('geolocationConsentido');

  if (permissionStatus.state === 'denied') {
    console.warn('Permissão negada anteriormente.');
    return { latitude: null, longitude: null };
  } else if (
    permissionStatus.state === 'prompt' &&
    geolocationConsentido === 'aceito'
  ) {
    localStorage.removeItem('geolocationConsentido');
  }

  if (geolocationConsentido === 'aceito') {
    return obterLocalizacao();
  } else if (geolocationConsentido === 'rejeitado') {
    return { latitude: null, longitude: null };
  }

  const consent = await mostrarAlertaConsentimento();

  localStorage.setItem(
    'geolocationConsentido',
    consent ? 'aceito' : 'rejeitado'
  );

  if (consent) {
    return obterLocalizacao();
  }

  return { latitude: null, longitude: null };
};

const mostrarAlertaConsentimento = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const alerta = window.confirm(
      'Nós gostaríamos de acessar sua geolocalização para melhorar a sua experiência. Você permite?'
    );

    resolve(alerta);
  });
};

const obterLocalizacao = (): Promise<{
  latitude: number | null;
  longitude: number | null;
}> => {
  const timeToWait = 5000; // 5 segundos

  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.warn('Geolocalização não é suportada pelo navegador.');
      resolve({ latitude: null, longitude: null });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        console.warn('Erro ao obter geolocalização:', error.message);
        resolve({ latitude: null, longitude: null });
      },
      {
        enableHighAccuracy: false,
        timeout: timeToWait,
      }
    );
  });
};
