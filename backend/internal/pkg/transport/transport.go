package transport

import (
	"sync"
	"time"
)

type Transport interface {
	Start()
	Stop(time.Duration)
}

func TransportController(transports []Transport) (stopFn func(duration time.Duration)) {
	var wg sync.WaitGroup

	for _, transport := range transports {
		wg.Add(1)
		go transport.Start()
	}

	return func(duration time.Duration) {
		for _, transport := range transports {
			go func(transport Transport) {
				transport.Stop(duration)
				wg.Done()
			}(transport)
		}
		wg.Wait()
	}
}
