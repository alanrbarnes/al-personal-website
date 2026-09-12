<?php

namespace App\Logging;

use Illuminate\Support\Str;
use Monolog\Formatter\LineFormatter;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;

class PerEmailLogger
{
    /**
     * Build a Monolog logger that writes each call to its own file.
     */
    public function __invoke(array $config): Logger
    {
        $filename = sprintf(
            'mail_%s_%s.log',
            now()->format('Y-m-d_His'),
            Str::random(6),
        );

        $handler = new StreamHandler(storage_path('logs/email/'.$filename), $config['level'] ?? Logger::DEBUG);
        $handler->setFormatter(new LineFormatter(null, null, true, true));

        return new Logger('email', [$handler]);
    }
}
